class {{appName}} {

    constructor (ObjectUtils, Criteria, DateUtils, SanPopup, MessageUtils, $scope, $element) {

        ObjectUtils.implements (this, IDynaformInterceptor);
        ObjectUtils.implements (this, IDatagridInterceptor);

        this.scope          = $scope;
        this.element        = $element;
        this.Criteria       = Criteria;
        this.DateUtils      = DateUtils;
        this.SanPopup       = SanPopup;
        this.MessageUtils   = MessageUtils;

        this.dynaform       = undefined;
        this.scopeDynaform  = undefined;
        this.dataset        = undefined;
        this.datagrid       = undefined;
        this.entityName     = '{{entityName}}';

    }

}