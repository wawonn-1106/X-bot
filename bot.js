const messages=[
    '尾道市立大学bot、起動！毎朝９時に投稿をお届けします。#尾道市立大学 #尾大 #尾道',
    //'バスがいつも通り遅刻、心安らかなり。尾大　心の俳句',
    /*'尾道ラーメンのように濃厚な投稿をお届けします。
    ただし、私のソースコードは背油ではなくセミコロンでできています。',*/
    //尾道水道の猫たちの歩き方に、何か重要な経済学のヒントが隠されている気がしてならない。
    //Googleマップ「徒歩15分」←大嘘。
    //オンライン授業のありがたみを知る大学。
    //猫は癒し、坂は現実。
    //本学の立地は学生の忍耐力を静かに育てております。
];

function getRandomMessage(){
    const randomIndex=Math.floor(Math.random()*messages.length);
    return messages[randomIndex];
}

const { TwitterApi } = require('twitter-api-v2');

const client=new TwitterApi({
    appKey:'d4lrlDBHJW3qJsOjze1leLrxj',
    appSecret:'XRm3aCmnry4OHQciEKNKUht64weqkdmcP4R3mEzG9dI97jdGrM',
    accessToken:'1938159014145363968-ugoAnPIONXBkBYJ5AlVlwkQXeikkHa',
    accessSecret:'OePro0jM0qexS5GiHn8eeymHXbzWwuHOwLceaZyYXksDe'
});

const rwClient=client.readWrite;

async function postOnomichiMessage(){
    const message=getRandomMessage();
    console.log(`[${new Date().toLocaleString()}]投稿開始:"message"`);

    try{
        const { data } = await rwClient.v2.tweet({ text: message });
        console.log('投稿に成功しました！');
    }catch(error){
        console.log('接続エラーが発生しました:',error);
    }
}

const schedule=require('node-schedule');

function startOnomichiBot(){
    const cronSchedule='0 00 9  * * *';

    const job=schedule.scheduleJob(cronSchedule,function(){
        postOnomichiMessage();
    });
}
startOnomichiBot();

