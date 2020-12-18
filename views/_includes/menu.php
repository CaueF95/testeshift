
<?php if (!defined('ABSPATH')) exit; ?>



<nav class="navbar-default navbar-static-side" role="navigation" >
    <div class="sidebar-collapse">
        <ul class="nav metismenu" id="side-menu">
            <li class="nav-header">
                    <div class="dropdown profile-element">
                        <p style="text-align: center;">
                            <a href="<?php echo HOME_URI ?>">
                                <img alt="image" class="img-circle" src="<?php echo HOME_URI; ?>/views/_img/icone.png" style="border-radius: 0px;">
                            </a>
                        </p>
                    </div>
                <div class="logo-element">
                    SHIFT
                </div>
            </li>
            <li <?php echo (isset($links['home']) ? "class='active'" : "" ) ?> >
                <a href="<?php echo HOME_URI; ?>/ordemservico"><i class="fa fa-archive"></i> <span class="nav-label">Ordem de serviço</span></a>
            </li>
        </ul>
    </div>
</nav>
