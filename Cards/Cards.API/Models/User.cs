using System.ComponentModel.DataAnnotations;

namespace Users.API.Models
{
    public class User
    {
        [Key] //suggesting that this is the PK of this table
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string IcNum { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public bool? Status { get; set; }
        public int? RoleId { get; set; }

    }
}
