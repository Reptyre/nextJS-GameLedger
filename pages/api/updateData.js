import dataFriends from "../../data/dataFriends"

export default function handler(req, res){
    if(req.method === "POST"){
        const update = dataFriends[req.body[0]]
        update.rating = req.body[1]
        res.status(200).send(update)
        //res.status(200).send({message: "Your data update was sucessfull"})
    }
    else res.status(405).send({message: "update() allows only POST requests"})
}