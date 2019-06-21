const mongoose = require('mongoose');

const articleSchema = new mongoose.Schema({
    article: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        maxlength: 100,
        minlength: 11,
        validate(value) {
            if (!(/^[A-Za-z0-9\/\s\."'-]+$/.test(value))) {
                throw new Error('cannot include symbol');
            }
        }
    }
});

const Article = mongoose.model('Article', articleSchema);

module.exports = Article;