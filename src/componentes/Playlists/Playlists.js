import axios from "axios";
import React, {  useEffect, useState } from "react";
import Musicas from "../Musicas/Musicas";



function Playlists() {
    const [playlists, setPlaylists] = useState([])
    const [identificacao, setIdentificacao] = useState([])
    

const pegarTodasPlaylists = async () => {
    const headers = {
        headers: {
            Authorization: "kieffer-torricilia-barbosa"
        }
    }

    try{
        const result = await axios.get(`https://us-central1-labenu-apis.cloudfunctions.net/labefy/playlists`, headers)
        setPlaylists(result.data.result.list)
        setIdentificacao(result.data.result.list)
        
        
    } catch(erro) {
        console.log(erro)
        
    }
}

useEffect(() => {
    pegarTodasPlaylists()

}, [])





  
    return (
        <div>
            {playlists.map((playlist) => {
                return <Musicas key={playlist.id} id={identificacao} playlist={playlist}/>
            })}

        </div>
    );
}

export default Playlists;
