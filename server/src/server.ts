import express, { json } from 'express';
import cors from 'cors';

import { PrismaClient } from '@prisma/client';
import { convertHourStringToMinutes } from './utils/convert-hour-to-minutes';
import { convertMinutesToHourString } from './utils/convert-minutes-to-hour';

const prisma = new PrismaClient({
    log: ['query']
});

//Por padrao o express nao entede informaçoes enviadas em JSON.
const app = express();
// e é assim dessa forma que dizemos para o express que ele precisa ler em JSON 
app.use(express.json());

app.use(cors());


/// 1# 
app.get('/games', async (req, res) => {
    const games = await prisma.game.findMany({
        include: {
            _count: {
                select: {
                    ads: true,
                }
            }
        }
    })

    return res.json(games)
})

/// 2#
app.post('/games/:id/ads', async (req, res) => {
    const gameId = req.params.id;
    const body: any = req.body;

    const ad = await prisma.ad.create({
        data: {
            gameId,
            name: body.name,
            yearsPlaying: body.yearsPlaying,
            discord: body.discord,
            weekDays: body.weekDays.join(','),
            hoursStart: convertHourStringToMinutes(body.hoursStart),
            hoursEnd: convertHourStringToMinutes(body.hoursEnd),
            useVoiceChannel: body.useVoiceChannel,
        } 
    });

    return res.status(201).json(ad);
});


/// 3#
app.get('/games/:id/ads', async (req, res) => {
    const gameId = req.params.id;

    /** Const ads - Notas
     * na constante a baixo, ela vai procurar todos os campos
     *  e selecionar eles para fazer uma que aquele campo que nós queremos
     * (dados sensiveis), como no exemplo o Discord nao apareça.
     */
    const ads = await prisma.ad.findMany({
        select: {
            id: true,
            name: true,
            weekDays: true,
            useVoiceChannel: true,
            yearsPlaying: true,
            hoursStart: true,
            hoursEnd: true,
        },
        where: {
            gameId,
        },
        orderBy: {
            createdAt: 'desc'
        }
    });

    /** Const ads - Notas
     * basicamente o codigo a cima, ele está sendo um banco de dados
     * automatizado, o prisma é uma boa ferramenta para a automatização 
     * e a aceleração da criação do banco.
     */

    //Formatação dos dias da semana antes de retornar
    return res.json(ads.map((ad) => {
        return {
            ...ad,
            weekDays: ad.weekDays.split(','),
            hoursStart: convertMinutesToHourString(ad.hoursStart),
            hoursEnd: convertMinutesToHourString(ad.hoursEnd),
        }
    }))
});


/// 4#
app.get('/ads/:id/discord', async (req, res) => {
    const adId = req.params.id;

    const ad = await prisma.ad.findFirstOrThrow({
        select: {
            discord: true,
        },
        where: {
            id: adId,
        }
    });

    return res.json({
        discord: ad.discord
    });
});

app.listen(3333)