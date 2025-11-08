import mongoose from "mongoose";

const livroSchema = new mongoose.Schema(
  {
    id: {type: String},
    titulo: {
      type: String, 
      required: [true, "O título do livro é obrigatório."]
    },
    autor: {
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'autores', 
      required: [true, "O(a) autor(a) do livro é obrigatório."]
      },
    editora: {
      type: String, 
      required: [true, "A editora do livro é obrigatória."],
      enum: {
        values: ["Casa do código", "Alura", "Novatec", "Outros"],
        message: "A editora {VALUE} não é um valor permitido."
      }
    },
    numeroPaginas: {
      type: Number,
      validate: {
        validator: (valor) => {
          return valor >= 10 && valor <= 5000;
        },
        message: "O número {VALUE} de páginas deve estar entre 10 e 5000."
      }
    }
  }
);

/* EXEMPLO DE VALIDAÇÃO SIMPLES
    numeroPaginas: {
      type: Number,
      min: [10, "O número {VALUE} de páginas deve estar entre 10 e 5000."],
      max: [5000, "O número {VALUE} de páginas deve estar entre 10 e 5000."]
    }
*/

const livros= mongoose.model('livros', livroSchema);

export default livros;