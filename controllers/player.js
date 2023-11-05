const Player=require('../model/player')

exports.postPlayer=async (req,res,next)=>{
    try {
        const { Name, Photourl, Birthplace, Numberofmatches,Score,Fifties,Centuries,Wickets,Average,Description } = req.body;

        const player = await Player.create({ Name,Photourl, Birthplace,Numberofmatches,Score,Fifties,Centuries,Wickets,Average,Description});

        res.status(201).json(player); 

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
    }
};

exports.searchPlayer= async (req,res,next)=>{
    try{
        const Playername=req.query.name
        if(!Playername){
           return res.status(500).json({error:"name is missing"})
        }
       const player=await  Player.findOne({where:{ Name:Playername}})
       res.status(201).json(player)

    }catch(err){
        res.status(500).json({ error: err });

    }
}

exports.deletePlayer = (req, res, next) => {
    const playerId = req.params.id;

    if (!playerId) {
        return res.status(400).json({ error: "Player id is missing" });
    }

    Player.destroy({
        where: {
            id: playerId
        }
    })
    .then(() => {
        res.status(204).json({ message: 'Player was successfully deleted' });
    })
    .catch((err) => {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
    });
};


exports.getPlayer=async(req,res,next)=>{
    try{
        const playerid=req.params.id
        if(!playerid){
            return res.status(500).json({error:"player id is missing"})

        }
       let player=await Player.findByPk(playerid)
       res.status(202).json(player)
        

    }catch(err){
        res.status(500).json({error:err})

    }

}

exports.editPlayer=(req,res,next)=>{
    const playerid=req.params.id
    if(!playerid){
        return res.send(500).json({error:"player id is missing"})
    }
    let updatedName=req.body.Name
    let updatedPhotoUrl=req.body.Photourl
    let updatedBirthPlace=req.body.Birthplace
    let updatedNumberOfMatches=req.body.Numberofmatches
    let updatedScore=req.body.Score
    let updatedFifties=req.body.Fifties
    let updatedCenturies=req.body.Centuries
    let updatedWickets=req.body.Wickets
    let updatedAverage=req.body.Average
    let updatedDescription=req.body.Description

    Player.update({
        Name:updatedName,
        Photourl:updatedPhotoUrl,
        Birthplace:updatedBirthPlace,
        Numberofmatches:updatedNumberOfMatches,
        Score:updatedScore,
        Fifties:updatedFifties,
        Centuries:updatedCenturies,
        Wickets:updatedWickets,
        Average:updatedAverage,
        Description:updatedDescription

    },{where:{
        id:playerid
    }

    }).then((updatedPlayer)=>{
        res.status(200).json(updatedPlayer)

    }).catch((err)=>{
        console.log("error while updating")
        res.status(500).json(err)
    })
    

}
