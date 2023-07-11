using Cards.API.Models;
using Users.API.Models;
using Microsoft.EntityFrameworkCore;
using Roles.API.Models;
using StatusCodes.API.Models;

namespace Cards.API.Data
{
    //inherit from DbContext Ctrl+. using
    public class CardsDbContext : DbContext
    {
        public CardsDbContext(DbContextOptions options) : base(options)
        {

        }

        //Dbset (property in frameworkcore) act as table in sql server
        public DbSet<Card> Cards { get;set;}
        public DbSet<User> Users { get;set; }
        public DbSet<Role> Roles { get;set; }
        public DbSet<Status> Status { get;set; }
        public DbSet<Course> Courses { get;set; }
        public DbSet<Student> Students { get;set; }
        //dbset type card import from Models
        //replica sqlserver card table
    }
}
