using AgenciaViajesWEBAPI.Models;
using System;
using System.Collections.Generic;
using System.Data.Entity.ModelConfiguration.Conventions;
using System.Data.Entity;
using System.Linq;
using System.Web;

namespace AgenciaViajesWEBAPI.DbContext
{
    public class Context : System.Data.Entity.DbContext
    {
        public DbSet<Viajero> Viajeros { get; set; }
        public DbSet<Destino> Destinos { get; set; }
        public DbSet<Viaje> Viajes { get; set; }
        public Context() : base("AgenciaViajes")
        {

        }
        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            modelBuilder.Conventions.Remove<PluralizingTableNameConvention>();
        }
    }
}