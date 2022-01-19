﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Models;

namespace web_projekat.Migrations
{
    [DbContext(typeof(BolnicaContext))]
    [Migration("20211226203139_V1")]
    partial class V1
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .UseIdentityColumns()
                .HasAnnotation("Relational:MaxIdentifierLength", 128)
                .HasAnnotation("ProductVersion", "5.0.0");

            modelBuilder.Entity("Models.Bolnica", b =>
                {
                    b.Property<int>("ID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .UseIdentityColumn();

                    b.Property<string>("Adresa")
                        .IsRequired()
                        .HasMaxLength(50)
                        .HasColumnType("nvarchar(50)");

                    b.Property<string>("Grad")
                        .IsRequired()
                        .HasMaxLength(50)
                        .HasColumnType("nvarchar(50)");

                    b.Property<string>("Naziv")
                        .IsRequired()
                        .HasMaxLength(100)
                        .HasColumnType("nvarchar(100)");

                    b.HasKey("ID");

                    b.ToTable("Bolnica");
                });

            modelBuilder.Entity("Models.Lekar", b =>
                {
                    b.Property<int>("BrojLicence")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .UseIdentityColumn();

                    b.Property<string>("Ime")
                        .IsRequired()
                        .HasMaxLength(20)
                        .HasColumnType("nvarchar(20)");

                    b.Property<int?>("OdeljenjeID")
                        .HasColumnType("int");

                    b.Property<string>("Prezime")
                        .IsRequired()
                        .HasMaxLength(20)
                        .HasColumnType("nvarchar(20)");

                    b.Property<string>("Specijalnost")
                        .IsRequired()
                        .HasMaxLength(20)
                        .HasColumnType("nvarchar(20)");

                    b.Property<int>("Staz")
                        .HasColumnType("int");

                    b.HasKey("BrojLicence");

                    b.HasIndex("OdeljenjeID");

                    b.ToTable("Lekar");
                });

            modelBuilder.Entity("Models.Odeljenje", b =>
                {
                    b.Property<int>("ID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .UseIdentityColumn();

                    b.Property<int?>("BolnicaID")
                        .HasColumnType("int");

                    b.Property<int>("Kapacitet")
                        .HasColumnType("int");

                    b.Property<int>("Sprat")
                        .HasColumnType("int");

                    b.Property<string>("Tip")
                        .IsRequired()
                        .HasMaxLength(20)
                        .HasColumnType("nvarchar(20)");

                    b.HasKey("ID");

                    b.HasIndex("BolnicaID");

                    b.ToTable("Odeljenje");
                });

            modelBuilder.Entity("Models.Oprema", b =>
                {
                    b.Property<int>("SerijskiBroj")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .UseIdentityColumn();

                    b.Property<int?>("PacijentMaticniBroj")
                        .HasColumnType("int");

                    b.Property<string>("Tip")
                        .IsRequired()
                        .HasMaxLength(20)
                        .HasColumnType("nvarchar(20)");

                    b.HasKey("SerijskiBroj");

                    b.HasIndex("PacijentMaticniBroj");

                    b.ToTable("Medicinska Oprema");
                });

            modelBuilder.Entity("Models.Pacijent", b =>
                {
                    b.Property<int>("MaticniBroj")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .UseIdentityColumn();

                    b.Property<string>("Ime")
                        .IsRequired()
                        .HasMaxLength(20)
                        .HasColumnType("nvarchar(20)");

                    b.Property<int?>("OdeljenjeID")
                        .HasColumnType("int");

                    b.Property<string>("Prezime")
                        .IsRequired()
                        .HasMaxLength(20)
                        .HasColumnType("nvarchar(20)");

                    b.Property<string>("RezultatTesta")
                        .IsRequired()
                        .HasMaxLength(20)
                        .HasColumnType("nvarchar(20)");

                    b.Property<int>("Saturacija")
                        .HasColumnType("int");

                    b.Property<int>("Starost")
                        .HasColumnType("int");

                    b.Property<string>("TipTesta")
                        .IsRequired()
                        .HasMaxLength(20)
                        .HasColumnType("nvarchar(20)");

                    b.HasKey("MaticniBroj");

                    b.HasIndex("OdeljenjeID");

                    b.ToTable("Pacijent");
                });

            modelBuilder.Entity("Models.Lekar", b =>
                {
                    b.HasOne("Models.Odeljenje", "Odeljenje")
                        .WithMany("Lekari")
                        .HasForeignKey("OdeljenjeID");

                    b.Navigation("Odeljenje");
                });

            modelBuilder.Entity("Models.Odeljenje", b =>
                {
                    b.HasOne("Models.Bolnica", "Bolnica")
                        .WithMany("Odeljenja")
                        .HasForeignKey("BolnicaID");

                    b.Navigation("Bolnica");
                });

            modelBuilder.Entity("Models.Oprema", b =>
                {
                    b.HasOne("Models.Pacijent", "Pacijent")
                        .WithMany()
                        .HasForeignKey("PacijentMaticniBroj");

                    b.Navigation("Pacijent");
                });

            modelBuilder.Entity("Models.Pacijent", b =>
                {
                    b.HasOne("Models.Odeljenje", "Odeljenje")
                        .WithMany("Pacijenti")
                        .HasForeignKey("OdeljenjeID");

                    b.Navigation("Odeljenje");
                });

            modelBuilder.Entity("Models.Bolnica", b =>
                {
                    b.Navigation("Odeljenja");
                });

            modelBuilder.Entity("Models.Odeljenje", b =>
                {
                    b.Navigation("Lekari");

                    b.Navigation("Pacijenti");
                });
#pragma warning restore 612, 618
        }
    }
}
