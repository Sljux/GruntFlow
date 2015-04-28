new Task({
    request: function() {
        var search = '#angularjs OR #node OR #flowthings',
            token  = '<yout Twitter token>';

        return {
            uri: 'https://api.twitter.com/1.1/search/tweets.json?q=' + encodeURIComponent(search) + '&lang=en&include_entities=true&count=30',
            method  : 'GET',
            headers : {
                'Authorization': 'Bearer ' + token
            }
        }
    },
    callback: function(jsonString) {

        var json = JSON.parse(jsonString);

        return json.statuses.map(function(status) {
            return {
                elems: {
                    text: status.text,
                    id: status.id,
                    user: status.user.screen_name
                }
            }
        });
    }
});