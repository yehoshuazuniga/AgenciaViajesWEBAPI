using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;
using System.Xml.Linq;

namespace AgenciaViajesWEBAPI.Models
{
    public class Viaje
    {
        public int ViajeID { get; set; }
        [Range(50, 5000, ErrorMessage = "Solo se Permiten valores de 50 hasta 5000")]
        public int Precio { get; set; }
        [Display(Name = "Fecha del Viaje")]
        [DataType(DataType.Date)]
        //[ValidateDay(ErrorMessage = "Solo debes introducir fechas posteriores al dia de hoy")]
       // [DisplayFormat(DataFormatString = "{0:dd/MM/yyyy}", ApplyFormatInEditMode = true)]
        public DateTime Fecha_Viaje { get; set; }
        [Display(Name = "DNI Viajero")]
        //[ValidateAge]
        public int ViajeroID { get; set; }
        public Viajero Viajero { get; set; }
        public int DestinoID { get; set; }
        public Destino Destino { get; set; }
    }
}