
import NaoEncontrado from "../erros/NaoEncontrado.js";
import RequisicaoIncorreta from "../erros/RequisiçãoIncorreta.js";
import ErroValidacao from "../erros/ErroValidacao.js";
import { autores } from "../models/index.js";
import mongoose from "mongoose";

class AutorController {

  static listarAutores = async(req, res, next) => {
    try {
      const autoresResultado = await autores.find();

      res.status(200).json(autoresResultado);
      
  } catch (erro) {
       next(erro);
  }
  }

  static listarAutorPorId = async (req, res, next) => {
    
      try {
        const id = req.params.id;
  
        const autorResultado = await autores.findById(id);
        if (autorResultado !== null) {
          res.status(200).send(autorResultado);
        } else {
          next(new NaoEncontrado("Id do Autor não localizado."))
        }

      } catch (erro) {
        next(erro);
      }
    }
  
  
    static cadastrarAutor = async (req, res, next) => {
      try {
        let autor = new autores(req.body);
  
        const autorResultado = await autor.save();
  
        res.status(201).send(autorResultado.toJSON());
      } catch (erro) {
        next(erro);
      }
    }
  

    static atualizarAutor = async (req, res, next) => {
      try {
        const id = req.params.id;

        // Valida formato do id antes de consultar o banco
        if (!mongoose.Types.ObjectId.isValid(id)) {
          next(new RequisicaoIncorreta("Id do Autor inválido."));
        }

        // Retorna o documento atualizado ({ new: true }) e executa validações do schema
        const autorAtualizado = await autores.findByIdAndUpdate(
          id,
          { $set: req.body },
          { new: true, runValidators: true }
        );

        // Se não encontrou o autor, lança erro 404
        if (!autorAtualizado) {
          next(new NaoEncontrado("Id do Autor não localizado."));
        }

        res.status(200).send({ message: "Autor atualizado com sucesso", autor: autorAtualizado });
      } catch (erro) {
        // Mapeia erros de validação do mongoose para nossa classe de erro de validação
        if (erro.name === "ValidationError") {
          next(new ErroValidacao(erro));
        }

        next(erro);
      }
    }
  
    static excluirAutor = async (req, res, next) => {
      try {
        const id = req.params.id;
  
        const autorResultado = await autores.findByIdAndDelete(id);
        
        if (autorResultado !== null) {
          res.status(200).send({message: "Autor removido com sucesso"});
        } else {
          next(new NaoEncontrado("Id do Autor não localizado."));
        }
      } catch (erro) {
        next(erro);
      }
    }
  

}

export default AutorController