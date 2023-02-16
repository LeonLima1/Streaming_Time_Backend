import db from '../infra/db.js';

class sugestaoDAO {
    static mostrarSugestao() {
        const consulta = "SELECT * FROM SUGESTOES";
        return new Promise((resolve, reject) => {
            db.all(consulta, (error, rows) => {
                if (error) {
                    reject(error);
                }
                else {
                    resolve(rows)

                }
            });
        });
    }

    static buscarSugestao(nome_usuario) {
        const consulta = 'SELECT * FROM SUGESTOES WHERE nome_usuario = ?';
        return new Promise((resolve, reject) => {
            db.get(consulta, [nome_usuario], (error, rows) => {
                if (error) {
                    reject(error);
                }
                else {
                    resolve(rows);
                }
            });
        });
    }

    static addSugestao(sugestaoModel) {
        console.log(sugestaoModel);
        const consulta = "INSERT INTO SUGESTOES (nome_usuario, email_usuario, sugestao_usuario) VALUES (?, ?, ?)"
        return new Promise((resolve, reject) => {
            db.run(consulta, [sugestaoModel.nome_usuario, sugestaoModel.email_usuario, sugestaoModel.sugestao_usuario ], (error) => {
                if (error) {
                    reject({
                        mensagem: 'Deu ruim ao tentar CRIAR a sugestão, tente novamente.',
                        erro: error
                    })
                }
                else {
                    resolve({ mensagem: 'Sugestão CRIADA com sucesso.' })
                }

            });
        });

    }


    static deletarSugestao(id) {
        const consulta = 'DELETE FROM SUGESTOES WHERE id = ?';
        return new Promise((resolve, reject) => {
            db.run(consulta, [id], (error) => {
                if (error) {
                    reject({
                        mensagem: "Deu ruim ao tentar DELETAR a sugestão, tente novamente.",
                        erro: error
                    })
                }
                else {
                    resolve({ mensagem: "Sugestão DELETADA com sucesso." })


                }

            });
        });
    }

    static atualizarSugestao(id, atualizarSugestao) {
        const consulta = "UPDATE SUGESTOES SET nome_usuario = ?, email_usuario = ?, sugestao_usuario = ? WHERE id = ?";
        return new Promise((resolve, reject) => {
            db.run(consulta, [atualizarSugestao.nome_usuario, atualizarSugestao.email_usuario, atualizarSugestao.sugestao_usuario, id], (err) => {
                if (err) {
                    reject({
                        mensagem: "Deu ruim ao tentar ATUALIZAR a sugestão, tente novamente.",
                        erro: err
                    })
                }
                else {
                    resolve({ mensagem: "Sugestão ATUALIZADA com sucesso."  })
                }

            });
        });
    }
}

export default sugestaoDAO;