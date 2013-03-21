// autocomplete methods in here

// create a fast lookup Trie for matching partial words
function Trie(vertex) {
    this.root = vertex;

    this.addWord = function(vertex, word) {
        if(!word.length) {
            return;
        } else {
            vertex.words.push(word);
            if(!(word[0] in vertex.children)) {
                vertex.children[word[0]] = new Vertex(word[0]);
            }
            this.addWord(vertex.children[word[0]], word.substring(1));
            return;
        }
    }

    // fast lookup for auto-complete
    this.retrieve = function(prefix) {
        console.log("prefix:" + prefix);
        var vertex = this.root;
        while(prefix.length) {
            vertex = vertex.children[prefix[0]];
            prefix = prefix.substring(1);
            if(!vertex) {
                return '';
            }
        }
        return vertex.words;
    }

    this.retrieveProperNames = function (prefix) {
        var words = this.retrieve(prefix);
        return this.toTitleCaseWords(prefix, words);
    }
}

function Vertex(val) {
    this.children = {};
    this.words = [];
    this.val = val;
}

// List of Temples read from text file
var presidentNames;
var fs = require('fs');
var rootVert = new Vertex('');
var trie = new Trie(rootVert);

fs.readFile('./public/presidents.txt', function(err, data) {
    presidentNames = data.toString().split('\n');
    for(var i in presidentNames) {
        var country = presidentNames[i].toLowerCase();
        trie.addWord(rootVert, country);
    }
});


module.exports.trie = trie;
