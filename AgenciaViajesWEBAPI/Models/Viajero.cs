using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;
using System.Xml.Linq;

namespace AgenciaViajesWEBAPI.Models
{
    public class Viajero
    {
        public int ViajeroID { get; set; }
        [Display(Name = "DNI")]
        public string dni { get; set; }
        public string Nombre { get; set; }
        [Display(Name = "Fecha de Nacimiento")]
        [DataType(DataType.Date)]
        [DisplayFormat(DataFormatString = "{0:dd/MM/yyyy}", ApplyFormatInEditMode = true)]
        public DateTime Fecha_Nacimiento { get; set; }
        public string Telefono { get; set; }
    }
}