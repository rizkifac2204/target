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
  const data = await db("tbl_provinsi").where("id", id).first();

  const kabkot = await db("tbl_kabupaten")
    .where("id_prov", id)
    .orderBy("kabupaten", "asc");

  const result = {
    result: data,
    kabkot: kabkot,
  };
  res.json(result);
});

export default handler;
