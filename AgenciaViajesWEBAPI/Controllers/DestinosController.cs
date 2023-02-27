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
    public class DestinosController : ApiController
    {
        private Context db = new Context();

        // GET: api/Destinos
        public IQueryable<Destino> GetDestinos()
        {
            return db.Destinos;
        }

        // GET: api/Destinos/5
        [ResponseType(typeof(Destino))]
        public IHttpActionResult GetDestino(int id)
        {
            Destino destino = db.Destinos.Find(id);
            if (destino == null)
            {
                return NotFound();
            }

            return Ok(destino);
        }

        // PUT: api/Destinos/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutDestino(int id, Destino destino)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != destino.DestinoID)
            {
                return BadRequest();
            }

            db.Entry(destino).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!DestinoExists(id))
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

        // POST: api/Destinos
        [ResponseType(typeof(Destino))]
        public IHttpActionResult PostDestino(Destino destino)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.Destinos.Add(destino);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = destino.DestinoID }, destino);
        }

        // DELETE: api/Destinos/5
        [ResponseType(typeof(Destino))]
        public IHttpActionResult DeleteDestino(int id)
        {
            Destino destino = db.Destinos.Find(id);
            if (destino == null)
            {
                return NotFound();
            }

            db.Destinos.Remove(destino);
            db.SaveChanges();

            return Ok(destino);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool DestinoExists(int id)
        {
            return db.Destinos.Count(e => e.DestinoID == id) > 0;
        }
    }
}