//封装一个函数：获取一个结果：当前早上|中午|下午|晚上
export const GET_TIME =() => {
    let message = "";
    //通过内置构造函数Date()
    let hours = new Date().getHours();
    console.log(hours);
    if(hours<=5){
        message = '凌晨了，要注意休息哦'
    }else if(hours<=10){
        message = '早上好，祝你每天好心情'
    }else if(hours<=14){
        message = '中午好，要注意吃饭哦'
    }else if(hours<=18){
        message = '下午好，准备好下班了吗'
    }else{
        message = '晚上好，要早些休息哦'
    }
    console.log(message);
    return message;
    
}