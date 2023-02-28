using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Description;
using AgenciaViajesWEBAPI.DbContext;
using AgenciaViajesWEBAPI.Models;

namespace AgenciaViajesWEBAPI.Controllers
{
    public class ViajesController : ApiController
    {
        private Context db = new Context();

        // GET: api/Viajes
        public IQueryable<Viaje> GetViajes()
        {
            return db.Viajes.Include(v=>v.Viajero).Include(v=>v.Destino);
        }

        // GET: api/Viajes/5
        [ResponseType(typeof(Viaje))]
        public IHttpActionResult GetViaje(int id)
        {
            var viaje = db.Viajes.Where(v=>v.ViajeID==id)
                .Select(v=> new
                {
                    idViaje=v.ViajeID,
                    precio = v.Precio,
                    fechaVuelo=v.Fecha_Viaje,
                      viajero= v.Viajero,
                      destino= v.Destino
                }).ToList();
            if (viaje == null)
            {
                return NotFound();
            }

            return Ok(viaje);
        }

        // PUT: api/Viajes/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutViaje(int id, Viaje viaje)
        {
            DateTime le = (viaje.Fecha_Viaje);
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != viaje.ViajeID)
            {
                return BadRequest();
            }

            db.Entry(viaje).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ViajeExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return StatusCode(HttpStatusCode.NoContent);
        }

        // POST: api/Viajes
        [ResponseType(typeof(Viaje))]
        public IHttpActionResult PostViaje(Viaje viaje)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.Viajes.Add(viaje);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = viaje.ViajeID }, viaje);
        }

        // DELETE: api/Viajes/5
        [ResponseType(typeof(Viaje))]
        public IHttpActionResult DeleteViaje(int id)
        {
            Viaje viaje = db.Viajes.Find(id);
            if (viaje == null)
            {
                return NotFound();
            }

            db.Viajes.Remove(viaje);
            db.SaveChanges();

            return Ok(viaje);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool ViajeExists(int id)
        {
            return db.Viajes.Count(e => e.ViajeID == id) > 0;
        }
    }
}