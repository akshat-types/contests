const players = [
  { name: "Aman", score: 320 },
  { name: "Riya", score: 410 },
  { name: "Kabir", score: 410 },
  { name: "Arjun", score: 250 },
  { name: "Sneha", score: 320 }
];

data=players.sort((a,b) => b.score-a.score)
rank=1
score=data[0].score
for(let i=0;i<data.length;i++){
    if(data[i].score!=score){
        rank=i+1
        score=data[i].score
    }
    data[i]["rank"]=rank
}
console.log(data)