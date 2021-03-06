import db from "libs/db";
import nextConnect from "next-connect";

const handler = nextConnect({
  onError: (err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: err.toString(), type: "error" });
  },
  onNoMatch: (req, res) => {
    res.status(404).json({ message: "Not found", type: "error" });
  },
}).get(async (req, res) => {
  const { id } = req.query;
  const data = await db
    .from("tbl_data_bawaslu")
    .select("tbl_data_bawaslu.*", "tbl_users.nama")
    .innerJoin("tbl_users", function () {
      this.on("tbl_data_bawaslu.id_wilayah", "=", "tbl_users.id_prov").orOn(
        "tbl_data_bawaslu.id_wilayah",
        "=",
        "tbl_users.id_kabkot"
      );
    })
    .where("tbl_data_bawaslu.id_wilayah", id)
    .first();

  if (!data)
    return res.json({
      email: "Tidak Ditemukan",
      telp: "Tidak Ditemukan",
      kota: "Tidak Ditemukan",
      alamat: "Tidak Ditemukan",
      nama: "Tidak Ditemukan",
    });

  res.json(data);
});

export default handler;
