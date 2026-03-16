<!-- Injecao de variaveis e dependencias para a compilacao do JSP -->
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" isELIgnored="false" %>
<%@ page import="br.com.sankhya.modelcore.auth.AuthenticationInfo" %>
<%@ taglib prefix="snk" uri="/WEB-INF/tld/sankhyaUtil.tld" %>
<!--  -->

<!DOCTYPE html>
<html lang= "pt-BR">

<head>
    <title></title>
    <meta charset= "UTF-8" />

    <!-- Custom Headers -->
    {{appHead}}

    <!-- Etenal Styles -->
    <link rel= "stylesheet" href= "https://ajax.googleapis.com/ajax/libs/angular_material/1.2.1/angular-material.min.css" />
    <link rel= "stylesheet" href= "https://cdnjs.cloudflare.com/ajax/libs/toastr.js/latest/toastr.min.css" />

    <!-- Internal Styles -->
    <link rel= "stylesheet" href= "/mge/assets/vendors/ui-grid/ui-grid.min.css?v=" />
    <link rel= "stylesheet" href= "/mge/assets/vendors/bootstrap.min.css?v=" />
    <link rel= "stylesheet" href= "/mge/assets/vendors/loading-bar.min.css?v=" />
    <link rel= "stylesheet" href= "/mge/js/jqwidgets/styles/jqx.base.css" />
    <link rel= "stylesheet" href= "/mge/js/jqwidgets/styles/jqx.metro.css" />
    <link rel= "stylesheet" href= "/mge/assets/css/snk.min.css?v=" />
    <link rel= "stylesheet" href= "/mge/assets/vendors/bpmn/css/diagram-js.css" />
    <link rel= "stylesheet" href= "/mge/assets/vendors/bpmn/css/bpmn.css" />
    <link rel= "stylesheet" href= "/mge/assets/vendors/bpmn/css/bpmnsnk.css" />
    <link rel= "stylesheet" href= "/mge/scripts/vendors/fullcalendar/main.min.css?v=" />
    <link rel= "stylesheet" href= "/mge/html5/DynaformLauncher/DynaformLauncher.css" />

    <!-- Custom Syles -->
    {{appStyles}}

    <!-- Parameters Setup -->
    <script type= "text/javascript">
        var locale        = 'pt_BR';
        var i18nlocal     = null; // .i18n        : buildLocalI18nVar-method : bundle do dic. de dados
        var i18nAll       = {};   // .i18nBundles : i18nVars-method          : bundle dos defaults
        var i18nFramework = {};   // .i18nBundles : i18nVars-method          : bundle do framework
        /* */

        var localHostname    = window.location.hostname;
        var ngAppName        = "DynaformLauncherApp";
        var isSecurityDomain = false;
        var VSS              = null;
        var workspace;

        try {
            var parentHostname = window.top.window.location.hostname;

            if (parentHostname == localHostname) {
                isSecurityDomain = true;
            }

            if (isSecurityDomain) {
                workspace = parent.workspace;

                if (!workspace) {
                    if (parent.parent.workspace) {
                        workspace = parent.parent.workspace;
                    }
                }
            }
        } catch (e) {
            console.error (e);
        }


        /* Printer Setup */
        var printerAppPort    = 9096;
        var printerAppSSLPort = 9196;

        try {
            if (navigator.userAgent.indexOf ("Electron") !== -1) {
                if (sessionStorage.getItem ("printerAppPort")) {
                    printerAppPort = parseInt (sessionStorage.getItem ("printerAppPort"));
                    printerAppSSLPort = printerAppPort + 100;
                }
            }
        } catch (err) {
            console.log ("Erro ao consultar porta do WC: " + err);
        }

        APPLICATION_NAME= 'DynaformLauncher';
        MODULE_ID       = 'DynaformLauncher';
        PCSF            = "I08joRPTKIBHLGw=";
        PROFILEID       = 'S4W8LB';
        RAS             = "aXNTdXA=";
    </script>
    <script id="MGEParamsTag" type="text/javascript" tag-included-by-launcher="true">
        fetch("/mge/LauncherIncludes", {
            method: "POST",
            headers: { "Content-Type": "application/xml" },
            body: "<params></params>"
        }).then((response) => {
            response.text()
            .then((res) => {
                const paramRegex = /MGE_PARAMS\s*=\s*"(.*?)"/
                const paramMatch = res.match(paramRegex);
                const params = paramMatch ? paramMatch[1] : null;

                MGE_PARAMS = params
                globalThis.MGE_PARAMS = params
            })
            .catch((e) => console.error(e));
        })
        .catch((e) => console.error(e));
    </script>

    <!-- MGE Scripts -->
    <script src= "/mge/js/util/jquery-1.9.1.min.js?v="></script>
    <script src= "/mge/js/sf/sf.js?v="></script>
    <script src= "/mge/js/util/Base64.js?v="></script>
    <script src= "/mge/js/AppletCaller.js?v="></script>
    <script src= "/mge/js/impressao.js?v="></script>
    <script src= "/mge/scripts/custom-native-functions.js?v="></script>

    <!-- Angular Dependecies -->
    <script src= "/mge/scripts/vendors/angular/angular.js?v="></script>
    <script src= "/mge/scripts/vendors/angular/angular-touch.js?v="></script>
    <script src= "/mge/scripts/vendors/angular/angular-animate.min.js?v="></script>
    <script src= "/mge/scripts/vendors/angular/angular-aria.min.js?v="></script>
    <script src= "/mge/scripts/vendors/angular/angular-sanitize.min.js?v="></script>
    <script src= "/mge/scripts/vendors/translate/angular-translate.js?v="></script>

    <!-- Angular Material -->
    <script src= "https://ajax.googleapis.com/ajax/libs/angular_material/1.2.1/angular-material.min.js"></script>

    <!-- Sankhya Transactions -->
    <script src= "https://cdn.jsdelivr.net/gh/wansleynery/SankhyaJX/jx.min.js"></script>

    <!-- Exteranl Scrtips -->
    <script src= "https://cdn.jsdelivr.net/npm/sweetalert2@11.4.13/dist/sweetalert2.all.min.js"></script>
    <script src= "https://cdnjs.cloudflare.com/ajax/libs/toastr.js/latest/toastr.min.js"></script>

    <!-- Window Sankhya Dependecies -->
    <script src="/mge/scripts/vendors/ui-bootstrap/ui-bootstrap-tpls.min.js?v="></script>
    <script src="/mge/scripts/vendors/ui-grid/ui-grid.modified.js?v="></script>
    <script src="/mge/scripts/vendors/numeral/numeral.min.js?v="></script>
    <script src="/mge/scripts/vendors/moment/moment.min.js"></script>
    <script src="/mge/scripts/vendors/loading-bar/loading-bar.min.js?v="></script>
    <script src="/mge/scripts/vendors/sortable/sortable.min.js?v="></script>
    <script src="/mge/scripts/vendors/ui-mask/mask.min.js?v="></script>
    <script src="/mge/scripts/vendors/tinymce/tinymce.min.js?v="></script>
    <script src="/mge/scripts/vendors/tinymce/uitinymce.js?v="></script>
    <script src="/mge/scripts/vendors/tinymce/langs/pt_BR.js?v="></script>
    <script src="/mge/scripts/vendors/tinymce/langs/en_CA.js?v="></script>
    <script src="/mge/scripts/vendors/ace/ace.min.js?v="></script>
    <script src="/mge/scripts/vendors/clipboard/clipboard.min.js?v="></script>
    <script src="/mge/scripts/vendors/ag-grid/ag-grid-enterprise.js?v="></script>
    <script src="/mge/scripts/vendors/bpmn/bpmn-custom-modeler.development.js?v="></script>
    <script src="/mge/scripts/vendors/snapsvg/snap.svg-min.js?v="></script>
    <script src="/mge/scripts/vendors/crypto-js/crypto-js.js?v="></script>
    <script src="/mge/scripts/vendors/fullcalendar/main.min.js?v="></script>
    <script src="/mge/scripts/vendors/fullcalendar/locales/es.js?v="></script>
    <script src="/mge/scripts/vendors/fullcalendar/locales/pt-br.js?v="></script>

    <!-- Sankhya Custom Dependecies -->
    <script src= "/mge/js/jqwidgets/jqxcore.js?v="></script>
    <script src= "/mge/js/jqwidgets/jqxdata.js?v="></script>
    <script src= "/mge/js/jqwidgets/jqxlistbox.js?v="></script>
    <script src= "/mge/js/jqwidgets/jqxbuttons.js?v="></script>
    <script src= "/mge/js/jqwidgets/jqxscrollbar.js?v="></script>
    <script src= "/mge/js/jqwidgets/jqxmenu.js?v="></script>
    <script src= "/mge/js/jqwidgets/jqxgrid.js?v="></script>
    <script src= "/mge/js/jqwidgets/jqxgrid.selection.js?v="></script>
    <script src= "/mge/js/jqwidgets/jqxgrid.columnsresize.js?v="></script>
    <script src= "/mge/js/jqwidgets/jqxgrid.columnsreorder.js?v="></script>
    <script src= "/mge/js/jqwidgets/jqxgrid.sort.js?v="></script>
    <script src= "/mge/js/jqwidgets/jqxgrid.filter.js?v="></script>
    <script src= "/mge/js/jqwidgets/jqxgrid.aggregates.js?v="></script>
    <script src= "/mge/js/jqwidgets/jqxdropdownlist.js?v="></script>
    <script src= "/mge/scripts/snk.js?v="></script>
    <script src= "/mge/scripts/launcher.js?v="></script>

    <!-- Services -->
    {{servicesScripts}}

    <!-- Custom Scripts -->
    {{appScripts}}

    <!-- Controllers -->
    {{appControllersScripts}}

    <!-- DynaformLauncher Setup -->
    <script>
        agGrid.LicenseManager.setLicenseKey (""
            + "Sankhya_Gestao_de_Negocios_Sankhya-W_2Devs6_November_2020__"
            + "MTYwNDYyMDgwMDAwMA==1f914bb75813904547879033c6de21d2"
        );
        agGrid.initialiseAgGridWithAngular1 (angular);

        globalThis.APPLICATION_NAME = 'DynaformLauncher';
        globalThis.MODULE_ID        = 'DynaformLauncher';
        globalThis.app              = '{{appName}}';
        globalThis.url              = '${BASE_FOLDER}/';
        globalThis.usuario          = '<%= ((AuthenticationInfo) session.getAttribute ("usuarioLogado")).getUserID ().toString () %>';

        class Runner {
            constructor (SkI18nService, SkWorkspace) {

                SkWorkspace.unlockSwitchApp ();

                SkI18nService.setLang (locale);

                angular.forEach (i18nAll, function (translations, bundleName) {
                    SkI18nService.addBundle (locale, bundleName, translations);
                });

                angular.forEach (i18nFramework, function (translations, bundleName) {
                    SkI18nService.addBundle (locale, bundleName, translations);
                });

            }
        }

        var DragEventDirective = {};

        angular.forEach (
            'drag dragend dragenter dragexit dragleave dragover dragstart drop'.split (' '),
            function (eventName) {
                var directiveName = 'ng' + eventName.charAt (0).toUpperCase () + eventName.slice (1);

                DragEventDirective [directiveName] = ['$parse', '$rootScope', function ($parse, $rootScope) {
                    return {
                        restrict: 'A',
                        compile: function ($element, attr) {
                            var fn = $parse (attr [directiveName], null, true);

                            return function ngDragEventHandler (scope, element) {
                                element.on (eventName, function (event) {
                                    var callback = function () {
                                        fn (scope, {$event: event});
                                    };

                                    try {
                                        $timeout (() => scope.$apply (callback), 0);
                                    } catch (e) { /**/ }
                                });
                            };
                        }
                    };
                }];
            }
        );

        function startApplication () {
            angular
                .module     (globalThis.app, ['snk', 'ngSanitize'])
                .run        (Runner)
                .directive  (DragEventDirective)
                {{appControllers}};

            angular.bootstrap (document, [ globalThis.app ]);
        }
    </script>
</head>
<body>
    {{appBody}}
</body>
</html>