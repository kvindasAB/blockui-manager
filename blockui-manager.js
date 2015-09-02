var BlockUIManager = function(){

    this.isBlockInProgress = false;
    this.isUnblockPending = false;
    this.blockCount = 0;

    this.blockUI = function(options){
        console.log('blockUI...');
        if(this.isAlreadyBlocked() ){
            console.log('blockUI... - ignored', this.blockCount);
            this.blockCount++;
            return;
        }
        var self = this;
        this.isBlockInProgress = true;
        this.blockCount++;
        options.onBlock = function(){
            console.log('$blockUI.onBlock Complete');
            self.isBlockInProgress = false;
            if(self.isUnblockPending){
                self.isUnblockPending = false;
                self.unblockUI();
            }
        };
        options.onUnblock = function(){
            console.log('onUnblock...');
        };
        $.blockUI(options);
    };

    this.unblockUI = function(){
        console.log('unblockUI...');
        this.blockCount--;
        if(this.blockCount > 0){
            console.log('unblockUI... - ignored', this.blockCount);
            return;
        }
        if(this.isBlockInProgress){
            console.log('unblockUI... - pending');
            this.isUnblockPending = true;
            return;
        }
        $.unblockUI();
        this.blockCount = this.blockCount < 0 ? 0 : this.blockCount;
    }

    this.isAlreadyBlocked = function(){
        return this.blockCount > 0;
    }

};

BlockUIManager = BlockUIManager;

