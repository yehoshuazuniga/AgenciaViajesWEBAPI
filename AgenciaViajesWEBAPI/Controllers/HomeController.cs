using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace AgenciaViajesWEBAPI.Controllers
{
    public class HomeController : Controller
    {
        public ActionResult Index()
        {
            ViewBag.Title = "Home Page";

            return View();
        }

        public ActionResult Destino()
        {
            ViewBag.title = "Destinos";

            return View();
        }

        public ActionResult Viajero()
        {
            ViewBag.title = "Viajeros";

            return View();
        }

        public ActionResult Viaje()
        {
            ViewBag.title = "Viajes";

            return View();
        }

    }
}
