<html>
    <head>
    </head>
    <body>
        <sk-application layout="column" class="dynaform-launcher" ng-controller="{{controllerName}} as ctrl">

            <sk-dynaform flex 
                        layout="column" 
                        sk-id="ctrl.dynaformID" 
                        sk-entity-name="{{ ctrl.entityName }}"
                        sk-can-back-to-old-layout="true"
                        sk-accept-promise-search-field="false" ></sk-dynaform>

        </sk-application>
    </body>
</html>