/// Conversão do forma de string em horas para o 
/// formato em minutos para o banco ler corretamente a hora
// que sera registrada

export function convertHourStringToMinutes(hourString: string){
    const [hours, minutes] = hourString.split(':').map(Number);
    
    const minutesAmount = (hours * 60) + minutes;
    
    return minutesAmount;
}