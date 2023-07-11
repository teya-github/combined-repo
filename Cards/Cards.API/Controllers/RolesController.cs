using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;
using Cards.API.Data;
using Roles.API.Models;


namespace Cards.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class RolesController : Controller
    {
        private readonly CardsDbContext _context;

        public RolesController(CardsDbContext context)
        {
            this._context = context;
        }

        //Get All
        [HttpGet]
        [Route("/api/Roles/new")]
        public async Task<IActionResult> GetAllRoles()
        {
            //because it use entityframework, it knows where to go to to which database
            var role = await _context.Roles.ToListAsync();
            return Ok(role);
        }
    }

}
