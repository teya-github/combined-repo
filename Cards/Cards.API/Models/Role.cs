using System.ComponentModel.DataAnnotations;

namespace Roles.API.Models
{
    public class Role
    {
        [Key] //suggesting that this is the PK of this table
        public int RoleId { get; set; }
        public string Description { get; set; }
    }
}
