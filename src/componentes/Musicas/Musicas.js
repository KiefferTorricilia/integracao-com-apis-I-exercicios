import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Botao, ContainerInputs, ContainerMusicas, InputMusica, Musica } from './styled'



export default function Musicas(props) {
    const [musicas, setMusicas] = useState([])
    const [artista, setArtista] = useState("")
    const [musica, setMusica] = useState("")
    const [url, setUrl] = useState("")

   const onChangeMusica = (e) => {
        setMusica(e.target.value)
    }

    const onChangeArtista = (e) => {
        setArtista(e.target.value)
    }
    const onChangeUrl = (e) => {
        setUrl(e.target.value)
    }





    const headers = {
        headers: {
            Authorization: "kieffer-torricilia-barbosa"
        }
    }
    const pegarMusicas = () => {


        axios.get(`https://us-central1-labenu-apis.cloudfunctions.net/labefy/playlists/${props.playlist.id}/tracks`, headers)
            .then((resposta) => {
                setMusicas(resposta.data.result.tracks)
                console.log(resposta.data.result.tracks)
            })
            .catch((erro) => {
                console.log(erro)
            })
    }

    useEffect(() => {
        pegarMusicas()
    }, [])

    const adicionarMusicas = async () => {

        const body = {
            body: {
                name: musica,
                artist: artista,
                url: url,
            }
        }
console.log(body)
        try {
            await axios.post(`https://us-central1-labenu-apis.cloudfunctions.net/labefy/playlists/${props.playlist.id}/tracks`,body, headers)
            pegarMusicas()
        } catch (error) {
            console.log(error.response)
        }
    }

    const removerMusicas = async () => {
        try {
            await axios.delete(`https://us-central1-labenu-apis.cloudfunctions.net/labefy/playlists/${props.playlist.id}/tracks/:trackId`, headers)
        } catch (error) {
            
        }
    }



    return (
        <ContainerMusicas>
            <h2>{props.playlist.name}</h2>
            {musicas.map((musica) => {
                return (
                    <Musica key={musica.id}>
                        <h3>{musica.name} - {musica.artist}</h3>
                        <audio src={musica.url} controls />
                        <button>X</button>
                    </Musica>)
            })}
            <ContainerInputs>
                <InputMusica placeholder="artista" value={artista} onChange={onChangeArtista} />
                <InputMusica placeholder="musica" value={musica} onChange={onChangeMusica} />
                <InputMusica placeholder="url" value={url} onChange={onChangeUrl} />
                <Botao onClick={adicionarMusicas} >Adicionar musica</Botao>
            </ContainerInputs>
        </ContainerMusicas>
    )
}

