import axios from 'axios';


// send SMS 
export const sendSms = async (number, message) => {

    try {

        await axios.get(`https://bulksmsbd.net/api/smsapi?api_key=6hsc5aMFa1CMXuQuzIrn&type=text&number=${ number }&senderid=03590002777&message=${ message }`);
        
    } catch (error) {
        console.log(error);
    }

} 