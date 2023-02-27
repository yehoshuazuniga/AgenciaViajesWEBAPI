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
    public class ViajerosController : ApiController
    {
        private Context db = new Context();

        // GET: api/Viajeros
        public IQueryable<Viajero> GetViajeros()
        {
            return db.Viajeros;
        }

        // GET: api/Viajeros/5
        [ResponseType(typeof(Viajero))]
        public IHttpActionResult GetViajero(int id)
        {
            Viajero viajero = db.Viajeros.Find(id);
            if (viajero == null)
            {
                return NotFound();
            }

            return Ok(viajero);
        }

        // PUT: api/Viajeros/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutViajero(int id, Viajero viajero)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != viajero.ViajeroID)
            {
                return BadRequest();
            }

            db.Entry(viajero).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ViajeroExists(id))
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

        // POST: api/Viajeros
        [ResponseType(typeof(Viajero))]
        public IHttpActionResult PostViajero(Viajero viajero)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.Viajeros.Add(viajero);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = viajero.ViajeroID }, viajero);
        }

        // DELETE: api/Viajeros/5
        [ResponseType(typeof(Viajero))]
        public IHttpActionResult DeleteViajero(int id)
        {
            Viajero viajero = db.Viajeros.Find(id);
            if (viajero == null)
            {
                return NotFound();
            }

            db.Viajeros.Remove(viajero);
            db.SaveChanges();

            return Ok(viajero);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool ViajeroExists(int id)
        {
            return db.Viajeros.Count(e => e.ViajeroID == id) > 0;
        }
    }
}