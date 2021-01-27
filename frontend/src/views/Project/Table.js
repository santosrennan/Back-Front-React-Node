import React, { useState, useEffect } from 'react';
import MaterialTable from "material-table";
import { Modal, TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import api from "../../api.js";
import Button from '@material-ui/core/Button';
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";

const columns = [
  { title: 'Nome', field: 'name' },
  { title: 'Idade', field: 'age' },
  { title: 'Cargo', field: 'role' },

];


const useStyles = makeStyles((theme) => ({
  modal: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    top: '50%',
    left: '50%',
    right: '50%',
    transform: 'translate(-50%, -50%)',
    fontSize: "13px",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif"

  },
  iconos: {
    cursor: 'pointer'
  },
  inputMaterial: {
    width: '100%',
    bottom: '100%',
    left: '0',
  },
  table: {
    marginBottom: "0",
    width: "100%",
    maxWidth: "100%",
    backgroundColor: "transparent",
    borderSpacing: "0",
    borderCollapse: "collapse",
    fontSize: "13px",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif"
  },
  cardCategoryWhite: {
    color: "rgba(255,255,255,.62)",
    margin: "0",
    fontSize: "14px",
    marginTop: "0",
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    marginBottom: "0",
    textDecoration: "none",
    textAlign: "Left"
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none",
    textAlign: "Left"
  }
}));

function App() {
  const styles = useStyles();
  const [data, setData] = useState([]);
  const [modalInsertar, setModalInsertar] = useState(false);
  const [modalEditar, setModalEditar] = useState(false);
  const [modalEliminar, setModalEliminar] = useState(false);
  const [Taskselect, setTaskselect] = useState({
    name: "",
    age: "",
    role: "",
    id: "",
  })

  const handleChange = e => {
    const { name, value } = e.target;
    setTaskselect(prevState => ({
      ...prevState,
      [name]: value
    }));
  }

  //Chamadas PUT,GET,POST,DELETE
  const solicitacaoGet = async () => {
    await api.get('funcionario')
      .then(response => {
        setData(response.data);
      }).catch(err => {
        console.log(err);
      })
  }

  const solicitacaoPost = async () => {
    await api.post('funcionario', Taskselect)

      .then(response => {
        setData(data.concat(response.data));
        abrirFecharModalInsert();
        refreshPage()
      }).catch(error => {
        console.log(error);
      })


  }
  function refreshPage() {
    window.location.reload();
  }

  const solicitacaoPut = async () => {
    await api.put('funcionario' + "/" + Taskselect.id, Taskselect)
      .then(response => {
        var dataUpdate = data;
        dataUpdate.map(e => {
          if (e.id === Taskselect.id) {
            e.name = Taskselect.name;
            e.age = Taskselect.age;
            e.role = Taskselect.role;
          }
        });
        setData(dataUpdate);
        abrirFecharModalEdit();
      }).catch(error => {
        console.log(error);
      })
  }

  const solicitacaoDelete = async () => {
    await api.delete('funcionario' + "/" + Taskselect.id)
      .then(response => {
        setData(data.filter(e => e.id !== Taskselect.id));
        abrirFecharModalDelete();
      }).catch(error => {
        console.log(error);
      })
  }
  /// FIM

  //SELECIONADOR
  const selectTask = (e, caso) => {
    setTaskselect(e);
    (caso === "Editar") ? abrirFecharModalEdit()
      :
      abrirFecharModalDelete()
  }

  const abrirFecharModalInsert = () => {
    setModalInsertar(!modalInsertar);
  }


  const abrirFecharModalEdit = () => {
    setModalEditar(!modalEditar);
  }

  const abrirFecharModalDelete = () => {
    setModalEliminar(!modalEliminar);
  }

  useEffect(() => {
    solicitacaoGet();
  }, [])

  const bodyInsertar = (

    <div className={styles.modal}>
      <h3>Inserir funcionario</h3>
      <TextField className={styles.inputMaterial} label="Nome" name="name" onChange={handleChange} />
      <br />
      <TextField className={styles.inputMaterial} label="Idade" name="age" onChange={handleChange} />
      <br />
      <TextField className={styles.inputMaterial} label="Cargo" name="role" onChange={handleChange} />
      <br /><br />
      <div align="right">
        <Button color="primary" onClick={() => solicitacaoPost()}>Enviar</Button>
        <Button onClick={() => abrirFecharModalInsert()}>Cancelar</Button>
      </div>
    </div>
  )



  const bodyEditar = (
    <div className={styles.modal}>
      <h3>Editar e atualizar :)</h3>
      <TextField className={styles.inputMaterial} label="Nome" name="name" onChange={handleChange} value={Taskselect && Taskselect.name} />
      <br />
      <TextField className={styles.inputMaterial} label="Idade" name="age" onChange={handleChange} value={Taskselect && Taskselect.age} />
      <br />
      <TextField className={styles.inputMaterial} label="Cargo" name="role" onChange={handleChange} value={Taskselect && Taskselect.role} />

      <br />

      <div align="right">
        {<Button color="primary" onClick={() => solicitacaoPut()}>Enviar</Button>}
        <Button color="warning" onClick={() => abrirFecharModalEdit()}>Cancelar</Button>
      </div>
    </div>
  )

  const bodyEliminar = (
    <div className={styles.modal}>
      <p>
        Deseja deletar?? </p>
      <div align="right">
        {<Button color="primary" onClick={() => solicitacaoDelete()}>Sim</Button>}
        <Button color="warning" onClick={() => abrirFecharModalDelete()}>Não</Button>

      </div>

    </div>
  )

  return (

    <div className={"App"}>

      <br />
      <Button color="primary" variant="outlined" onClick={() => abrirFecharModalInsert()}>Inserir</Button>
      <br /><br />
      <Card>
        <CardHeader color="primary">
          <h4 className={styles.cardTitleWhite}>Tabela de funcionarios</h4>
        </CardHeader>
        <MaterialTable
          className={styles.table}
          columns={columns}
          data={data}
          title=""
          actions={[
            {
              icon: 'edit',
              tooltip: 'Editar ',
              onClick: (event, rowData) => selectTask(rowData, "Editar")
            },
            {
              icon: 'delete',
              tooltip: 'Eliminar ',
              onClick: (event, rowData) => selectTask(rowData, "Eliminar")
            }
          ]}
          options={{
            actionsColumnIndex: -1,
          }}
          localization={{
            header: {
              actions: ""
            }
          }}
        />


        <Modal
          open={modalInsertar}
          onClose={abrirFecharModalInsert}>
          {bodyInsertar}
        </Modal>


        <Modal
          open={modalEditar}
          onClose={abrirFecharModalEdit}>
          {bodyEditar}
        </Modal>

        <Modal
          open={modalEliminar}
          onClose={abrirFecharModalDelete}>
          {bodyEliminar}
        </Modal>
      </Card>
    </div>
  );
}

export default App;