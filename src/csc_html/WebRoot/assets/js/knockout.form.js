ko.dirtyFlag = function(root, isInitiallyDirty) {
    var result = function() {},
        _initialState       =   ko.observable(ko.toJSON(root)),
        _isInitiallyDirty   =   ko.observable(isInitiallyDirty);

    result.isDirty = ko.computed(function() {
        return _isInitiallyDirty() || _initialState() !== ko.toJSON(root);
    });

    result.reset = function() {
        _initialState(ko.toJSON(root));
        _isInitiallyDirty(false);
    };

    return result;
};

function FormField(data) {
    var self            =   this;
    self.Name           =   ko.observable(data.Name).extend({required:true});;
    self.Element        =   ko.observable(data.Element);
    self.Type           =   ko.observable(data.Type);
    self.Options        =   ko.observableArray(data.Options);
    self.Placeholder    =   ko.observable(data.Placeholder);
    self.Value          =   ko.observable(data.Value).extend(data.Validation);
    self.HideElement    =   ko.observable(data.HideField.HideElement);
    self.HideCondition  =   ko.observable(data.HideField.HideCondition);
}

function FormViewModel(data) {
    var self = this;

    self.Fields = ko.observableArray(ko.utils.arrayMap(data, function(item) {
        return new FormField(item);
    }));

    self.errors = ko.validation.group(this, { 
        deep        : true, 
        observable  : false 
    });
    
    self.SaveForm = function () {
        if(self.errors().length > 0) {
            self.errors.showAllMessages();
            return;
        }
    };

    self.HiddenElements = ko.observableArray([]);
    self.dirtyFlag = new ko.dirtyFlag(this);
    self.isDirty = ko.computed(function (){
        if (self.dirtyFlag.isDirty()){
        
            var formElements = self.Fields();

            for (var i=0;i<formElements.length;i++){

                var ElementValue            =   formElements[i].Value();
                var HideElement             =   formElements[i].HideElement();
                var HideCondition           =   formElements[i].HideCondition();

                if( HideElement !== ""){
                    for (var i=0;i<formElements.length;i++){
                        if(formElements[i].Name() === HideElement ){
                            if( ElementValue.match(HideCondition) ){
                                self.HiddenElements([HideElement]);
                            }
                        }
                    }
                }

            }
        }
    });
}