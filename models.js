const mongoose = require('mongoose');

const CONNECTION_STRING = process.env.MONGO_CONNECT_URI;

mongoose.connect(CONNECTION_STRING)
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.log('Error connecting to Mongo:', err));

const FlagSchema = new mongoose.Schema({
    ch_id: Number,
    flag: String,
    flag_sign: String
});

const ChallengesSchema = new mongoose.Schema({
    id: Number,
    title: String,
    type: String,
    difficulty: String,
    hint: {
        type: mongoose.Schema.Types.Mixed,
        default: null
    },
    desc: String,
    attachmentLink: {
        type: mongoose.Schema.Types.Mixed,
        default: null
    },
    externalLink: {
        type: mongoose.Schema.Types.Mixed,
        default: null
    },
    codeSnippets: {
        type: [String],
        default: []
    }
});

const ProjectsSchema = new mongoose.Schema({
    title: String,
    stack: String,
    desc: String,
    stars: String,
    forks: String,
    link: String
});

module.exports = {
    FlagsTbl: mongoose.model('flags', FlagSchema),
    ChallengesTbl: mongoose.model('challenges_infos', ChallengesSchema),
    ProjectsTbl: mongoose.model('project_infos', ProjectsSchema)
}
