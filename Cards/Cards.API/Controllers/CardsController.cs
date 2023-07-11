using Cards.API.Data;
using Cards.API.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Reflection.Metadata.Ecma335;
using Users.API.Models;

namespace Cards.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]//automatically take the controller name
    public class CardsController : Controller
    {
        private readonly CardsDbContext cardsDbContext;

        //Constructor injection to use dbcontext
        public CardsController(CardsDbContext cardsDbContext)
        {
            this.cardsDbContext = cardsDbContext;
        }

        //Get All Cards
        [HttpGet]
        public async Task<IActionResult> GetCards()
        {
            //because it use entityframework, it knows where to go to to which database
            var cards = await cardsDbContext.Cards.ToListAsync();
            return Ok(cards);
        }

        //Get single card
        [HttpGet]
        [Route("{id:guid}")] //force route to receive guid type
        [ActionName("GetCard")]
        public async Task<IActionResult> GetCard([FromRoute] Guid id)
        {
            var card = await cardsDbContext.Cards.FirstOrDefaultAsync(x => x.Id == id);
            if(card != null) 
            {
                return Ok(card);
            }

            return NotFound("Card not found");
        }

        //Get single card
        /*[HttpGet]
        [Route("{id:guid}")] //force route to receive guid type
        [ActionName("GetCard")]
        public async Task<IActionResult> Get2023Card([FromRoute] Guid id)
        {
            var card = await cardsDbContext.Cards.FirstOrDefaultAsync(x => x.Id == id);
            if(card != null) 
            {
                return Ok(card);
            }

            return NotFound("Card not found");
        }*/

        //Add Card
        [HttpPost]
        public async Task<IActionResult> AddCard([FromBody] Card card)
        {
            card.Id = Guid.NewGuid();  //create new id
            await cardsDbContext.Cards.AddAsync(card);
            await cardsDbContext.SaveChangesAsync(); //save new card to the table
            return CreatedAtAction(nameof(GetCard), new { id = card.Id }, card); //return 201 reponse
        }

        //Update Card
        [HttpPut]
        [Route("{id:guid}")]
        //From route - reference id of card that we want to change
        //From body - the updated details
        public async Task<IActionResult> UpdateCard([FromRoute] Guid id, [FromBody] Card card)
        {
            var existingCard = await cardsDbContext.Cards.FirstOrDefaultAsync(x => x.Id == id);
            if (existingCard != null)
            {
                existingCard.CardholderName= card.CardholderName;  
                existingCard.CardNumber = card.CardNumber;  
                existingCard.ExpiryMonth = card.ExpiryMonth;  
                existingCard.ExpiryYear = card.ExpiryYear;  
                existingCard.CVC = card.CVC;
                await cardsDbContext.SaveChangesAsync(); 
                return Ok(existingCard);
            }

            return NotFound("CardNotFound");
        }

        //Delete Card
        [HttpDelete]
        [Route("{id:guid}")]
        //From route - reference id of card that we want to delete
        public async Task<IActionResult> DeleteCard([FromRoute] Guid id)
        {
            var existingCard = await cardsDbContext.Cards.FirstOrDefaultAsync(x => x.Id == id);
            if (existingCard != null)
            {
                cardsDbContext.Remove(existingCard);
                await cardsDbContext.SaveChangesAsync();
                return Ok(existingCard);
            }

            return NotFound("Card Not Found");
        }

        //Notes: why use await? while you are waiting for all those records to commit, your code can continue to execute

        //Users
        //Get All Users
        [HttpGet]
        [Route("/api/Users")]
        [ActionName("GetUsers")]
        public async Task<IActionResult> GetUsers()
        {
            //because it use entityframework, it knows where to go to to which database
            //var users = await cardsDbContext.Users.ToListAsync();
            var users = await cardsDbContext.Users.OrderBy(x => x.Name).Select(x => new
            {
                Id = x.Id,
                Name = x.Name,
                IcNum = x.IcNum,
                Email = x.Email,
                Password = x.Password,
                Status = x.Status,
                RoleId = x.RoleId,
                Role = cardsDbContext.Roles.Where(y => y.RoleId == x.RoleId).Select(y => y.Description).FirstOrDefault(),
                StatusName = cardsDbContext.Status.Where(y => y.StatusId == x.Status).Select(y => y.Description).FirstOrDefault()
            }).ToListAsync();

            return Ok(users);
        }

        [HttpGet]
        [Route("/api/Users/Linq")]
        [ActionName("GetUsers")]
        public async Task<IActionResult> GetUserslinq()
        {
            var users = await (
            from user in cardsDbContext.Users
            orderby user.Name
            select new
            {
                Id = user.Id,
                Name = user.Name,
                IcNum = user.IcNum,
                Email = user.Email,
                Password = user.Password,
                Status = user.Status,
                RoleId = user.RoleId,
                Role = (
                    from role in cardsDbContext.Roles
                    where role.RoleId == user.RoleId
                    select role.Description
                ).FirstOrDefault(),
                StatusName = (
                    from status in cardsDbContext.Status
                    where status.StatusId == user.Status
                    select status.Description
                ).FirstOrDefault()
            }
            ).ToListAsync();


            return Ok(users);
        }

        /* //Get single user
         [HttpGet]
         [Route("/api/Users/{id:guid}")] //force route to receive guid type
         [ActionName("GetUserbyId")]
         public async Task<IActionResult> GetUserbyId(Guid id)
         {
             var user = await cardsDbContext.Users.FirstOrDefaultAsync(x => x.Id == id);

             if (user != null)
             {
                 return Ok(user);
             }

             return NotFound("user not found");
         }*/

        [HttpGet]
        [Route("/api/Users/{email}")]
        [ActionName("GetUserbyEmail")]
        public async Task<IActionResult> GetUserbyEmail(String email)
        {
            var user = await cardsDbContext.Users.FirstOrDefaultAsync(x => x.Email == email);
            if (user != null)
            {
                return Ok(user);
            }

            return NotFound("user not found");
        }

        /*[HttpGet]
        [Route("/api/{sampleId}")]
        public async Task<IActionResult> getSampleById(int sampleId)
        {
            var sample = await _context.Samples.FirstOrDefaultAsync(x => x.SampleId == sampleId);
            if (sample != null)
            {
                return Ok(sample);
            }

            return NotFound("sample not found");
        }*/

        //Get single User
        [HttpGet]
        [Route("/api/Users/{id:guid}")] 
        [ActionName("GetUser")]
        public async Task<IActionResult> GetUser([FromRoute] Guid id)
        {
            var user = await cardsDbContext.Users.FirstOrDefaultAsync(x => x.Id == id);
            if (user != null)
            {
                return Ok(user);
            }

            return NotFound("user not found");
        }

        //Add User
        [HttpPost]
        [Route("/api/Users/")]
        public async Task<IActionResult> AddUser([FromBody] User user)
        {
            user.Id = Guid.NewGuid();  //create new id

           /* user.Name = user.Name;
            user.Email = user.Email;
            user.IcNum = user.IcNum;
            user.Password = user.Password;
            user.Status = user.Status;
            user.RoleId = user.RoleId;*/

           
            await cardsDbContext.Users.AddAsync(user);
            await cardsDbContext.SaveChangesAsync();
            return Ok(user);
            //return CreatedAtAction(nameof(GetUser), new { id = user.Id }, user); //return 201 reponse
        }

        //Update 
        [HttpPut]
        [Route("/api/Users/{id:guid}")]
        public async Task<IActionResult> UpdateUser([FromRoute] Guid id, [FromBody] User user)
        {
            var existingUser = await cardsDbContext.Users.FirstOrDefaultAsync(x => x.Id == id);
            if (existingUser != null)
            {
                existingUser.Name = user.Name;
                existingUser.Email = user.Email;
                existingUser.IcNum = user.IcNum;
                existingUser.Password = user.Password;
                existingUser.Status = user.Status;
                existingUser.RoleId = user.RoleId;
                await cardsDbContext.SaveChangesAsync();
                return Ok(existingUser);
            }

            return NotFound("UserNotFound");
        }

        //Delete
        [HttpDelete]
        [Route("/api/Users/{id:guid}")]
        public async Task<IActionResult> DeleteUser([FromRoute] Guid id)
        {
            var existingUser = await cardsDbContext.Users.FirstOrDefaultAsync(x => x.Id == id);
            if (existingUser != null)
            {
                cardsDbContext.Remove(existingUser);
                await cardsDbContext.SaveChangesAsync();
                return Ok(existingUser);
            }

            return NotFound("User Not Found");
        }

        //Roles
       
        //Get single
        [HttpGet]
        [Route("/api/Roles/{id}")]
        [ActionName("GetRoles")]
        public async Task<IActionResult> GetRoles([FromRoute] int id)
        {
            var role = await cardsDbContext.Roles.FirstOrDefaultAsync(x => x.RoleId == id);
            if (role != null)
            {
                return Ok(role);
            }

            return NotFound("role not found");
        }

        //Get All
        [HttpGet]
        [Route("/api/Roles")]
        public async Task<IActionResult> GetRoles()
        {
            //because it use entityframework, it knows where to go to to which database
            var role = await cardsDbContext.Roles.ToListAsync();
            return Ok(role);
        }

        //status
        //Get All
        [HttpGet]
        [Route("/api/Status")]
        public async Task<IActionResult> GetStatuses()
        {
            //because it use entityframework, it knows where to go to to which database
            var status = await cardsDbContext.Status.ToListAsync();
            return Ok(status);
        }

        [HttpGet]
        [Route("/test/pagination")]
        public async Task<ActionResult<IEnumerable<Card>>> Get(int pageNumber = 1, int pageSize = 10, int searchYear = 0)
        {
            var query = cardsDbContext.Cards.Where(x => x.ExpiryYear.ToString().Contains(searchYear.ToString())); // apply any filtering
            int totalItems = await query.CountAsync();
            var items = await query.Skip((pageNumber - 1) * pageSize).Take(pageSize).ToListAsync();
            return Ok(new { items, totalItems });
        }


    }
}
