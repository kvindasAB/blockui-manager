var App = function(){

    this.manager = new BlockUIManager();
    this.blockUI = function(message){
        this.manager.blockUI({
            message: '<h1>Please Wait</h1>',
            backgroundColor: '#000',
            opacity:   0.6,
            color: '#fff',
        });
    };

    this.unblockUI = function(){
        this.manager.unblockUI();
        //$.unblockUI();
    };

    this.onBlockClicked = function(event){
        console.log('onBlockClicked...', event);
        this.blockUI();
    };

    this.onUnblockClicked = function(event){
        console.log('onUnblockClicked...', event);
    };

    this.onBlockAndUnblockClicked = function(event){
        this.blockUI();
        this.unblockUI();
    };

    this.onBlockAndUnblockAfter500Clicked = function(event){
        this.blockUI();
        var self = this;
        setTimeout(function(){
            self.unblockUI();
        }, 500)
    };

    this.onBlockAndUnblockTimesSerial = function(event){
        var times   = parseInt($('#timesSerial').val()),
            ms      = parseInt($('#secsSerial').val()),
            arr     = _.range(times),
            self    = this;
        async.eachSeries(arr,
            function iter(item, cb){
                self.blockUI();
                setTimeout(function(){
                    cb();
                },ms);
            },
            function(err, result){
                if(err){ return console.log('Error:', err); }

                async.eachSeries(arr,
                    function iter(item, cb){
                        setTimeout(function(){
                            self.unblockUI();
                            cb();
                        },ms);
                    },
                    function(err, result){
                        if(err){ console.log('Error:', err); }
                    });

            });
    };

    this.onBlockAndUnblockTimesParallel = function(event){
        var times   = parseInt($('#timesParallel').val()),
            ms      = parseInt($('#secsParallel').val()),
            arr     = _.range(times),
            self    = this;
        async.each(arr,
            function iter(item, cb){
                console.log('paralle.iter');
                self.blockUI();
                setTimeout(function(){
                    self.unblockUI();
                    cb();
                },ms);
            },
            function(err, result){
                if(err){ return console.log('Error:', err); }
            });
    };

};

app = new App();

console.log(app);