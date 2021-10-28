import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArchive } from "@fortawesome/free-solid-svg-icons";
import { FormControl, IconButton, InputAdornment, OutlinedInput } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import EditIcon from '@mui/icons-material/Edit';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

function App() {


  const [data, setData] = useState([])
  const [dataSelected, setDataSelected] = useState()
  const [finalizar, setFinalizar] = useState(true)
  const [textSearch, setTextSearch] = useState('bonito')

  console.log(dataSelected)

  const getData = async () => {
    await axios('https://apisaurussegmentos.azurewebsites.net/api/segmentos')
      .then(res => {
        console.log(res.data.list)
        setData(res.data.list)
      })
      .catch(err => console.log(err))
  }

  useEffect(() => {
    getData()
  }, [])

  return (
    <>
      <Container component="main" maxWidth="sm">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 15,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Typography component="h1" color="#3F9AEF" variant="h3" style={{ fontWeight: 300, marginBottom: 20 }}>
            <FontAwesomeIcon icon={faArchive} /> Segmento da Empresa
          </Typography>

          {finalizar ?
            <>
              <Typography align="center" style={{ fontWeight: 300 }}>
                Confirme o segmento que sua empresa atua para personalizarmos sua experiência em nosso aplicativo.
              </Typography>

              <Typography align="center" style={{ fontWeight: 300, marginTop: '5em' }}>
                Segmento Selecionado:
              </Typography>
              <Typography align="center" variant="h3" color="#3F9AEF" style={{ fontWeight: 300, marginBottom: '2em' }}>
                {dataSelected ? dataSelected.descricao : 'Selecione um Segmento'}
                <IconButton
                  edge="end"
                  onClick={() => setFinalizar(!finalizar)}
                >
                  <EditIcon fontSize="large" sx={{ color: "#3F9AEF" }} />
                </IconButton>
              </Typography>
              <Grid container>
                <Grid item xs={4}>

                  <Button
                    fullWidth
                    sx={{ textTransform: 'none' }}
                    variant="outlined"
                    onClick={() => setFinalizar(!finalizar)}
                  >
                    <ArrowBackIosNewIcon /> Voltar
                  </Button>
                </Grid>
                <Grid item xs={8}>

                  <Button
                    fullWidth
                    sx={{ textTransform: 'none', marginLeft: 1 }}
                    type="submit"
                    variant="contained"
                  >
                    <CheckCircleOutlineIcon sx={{ marginRight: 1 }} /> Finalizar
                  </Button>
                </Grid>
              </Grid>

            </>
            :
            <>
              <Typography align="center" style={{ fontWeight: 300, marginBottom: 40 }}>
                Selecione abaixo o segmento que mais se aproxima com o ramo de atividade de sua empresa.
              </Typography>

              <FormControl fullWidth variant="filled" sx={{ marginBottom: '4em' }} >
                <OutlinedInput
                  placeholder="Ex: Restaurante"
                  onChange={(e) => setTextSearch(e.target.value)}
                  type="text"
                  endAdornment={
                    <InputAdornment position="end">
                      <SearchIcon />
                    </InputAdornment>
                  }

                />
              </FormControl>

              {textSearch !== '' ?
                <>
                  {data.filter((val) => {
                    if (textSearch === '') {
                      return val
                    } else if (val.descricao.toLowerCase().includes(textSearch.toLowerCase())) {
                      return val
                    }
                  }).map((val, key) => {
                    return (
                      <Button variant="outlined" key={key}
                        sx={{ color: '#a4a4a4', borderColor: '#a4a4a4', marginBottom: 1 }}
                        fullWidth
                        onClick={() => {
                          setDataSelected(val)
                          setFinalizar(true)
                          setTextSearch('')
                        }}
                        size="large">
                        {val.descricao}
                      </Button>
                      // <div key={key}>
                      //   <p>{val.descricao}</p>
                      //   {console.log('data ', val.descricao, key)}
                      // </div>
                    )
                  })}
                </>
                :
                <Button variant="outlined"
                  sx={{ color: '#a4a4a4', borderColor: '#a4a4a4' }}
                  fullWidth
                  size="large">
                  Informe acima o segmento para continuar.
                </Button>
              }
              <Grid container sx={{ marginTop: '5em' }}>
                <Grid item xs={4}>

                  <Button
                    fullWidth
                    sx={{ textTransform: 'none' }}
                    type="submit"
                    variant="outlined"
                    onClick={() => setFinalizar(!finalizar)}
                  >
                    <ArrowBackIosNewIcon /> Voltar
                  </Button>
                </Grid>
              </Grid>
            </>
          }

        </Box>
      </Container>
    </>
  );
}

export default App;
