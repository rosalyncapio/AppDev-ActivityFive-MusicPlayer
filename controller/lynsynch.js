const lynsynch = {
    home: (req, res) => {
        res.render('home',{title: 'lynsynch'});
    },
    music: (req, res) => {
        res.render('music',{title: 'lynsynch'});
    },
};
module.exports = lynsynch;