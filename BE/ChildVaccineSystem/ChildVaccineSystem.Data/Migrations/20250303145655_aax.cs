using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ChildVaccineSystem.Data.Migrations
{
    /// <inheritdoc />
    public partial class aax : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "IsActive",
                table: "VaccineInventories",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<DateTime>(
                name: "AssignedDate",
                table: "DoctorWorkSchedules",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "IsActive",
                table: "VaccineInventories");

            migrationBuilder.DropColumn(
                name: "AssignedDate",
                table: "DoctorWorkSchedules");
        }
    }
}
