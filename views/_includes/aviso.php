<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Raízes Soluções</title>

        <link rel="stylesheet" type="text/css" href="<?php echo HOME_URI ?>/views/_js/plugins/fancybox3/dist/jquery.fancybox.css">

        <script src="<?php echo HOME_URI ?>/views/_includes/dist/js/jquery-3.2.1.min.js"></script>

        <style type="text/css">
            .centralizar {
            text-align: center !important;
            }
            .invisivel {
            display: none;
            }
            .img-alerta {
            width: 100px;
            }
        </style>

    </head>
    <body>
        <div class="invisivel centralizar" id="div-concluido">___</div>
        <a id="fancybox-concluido" data-fancybox data-src="#div-concluido" href="javascript:;"></a>

        <script> 
            $(document).ready(function() {
                $("#div-concluido").html('<?php echo $texto_mensagem ?>');

                $("#fancybox-concluido").trigger("click");

                $("#div-concluido .fancybox-close-small").remove();

                setTimeout(function(){
                    $.fancybox.close();

                    window.location.href = "<?php echo $url_redirect ?>";
                }, 1000);
            });
        </script>

        <script src="<?php echo HOME_URI ?>/views/_js/plugins/fancybox3/dist/jquery.fancybox.min.js"></script>

    </body>
</html>