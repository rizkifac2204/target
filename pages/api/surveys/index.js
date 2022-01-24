import db from "libs/db";
import Handler from "middlewares/Handler";
import { conditionWillSpesific } from "middlewares/Condition";

export default Handler()
  .get(async (req, res) => {
    const result = await db
      .select(
        "tbl_survey.*",
        "tbl_provinsi.provinsi",
        "tbl_kabupaten.kabupaten"
      )
      .from("tbl_survey")
      .leftJoin("tbl_provinsi", "tbl_survey.id_will", "tbl_provinsi.id")
      .leftJoin("tbl_kabupaten", "tbl_survey.id_will", "tbl_kabupaten.id")
      .modify((builder) =>
        conditionWillSpesific(db, builder, req.session.user, "tbl_survey")
      )
      .orderBy("tbl_survey.created_at", "desc");

    res.json(result);
  })
  .delete(async (req, res) => {
    const arrID = req.body;
    const proses = await db("tbl_survey").whereIn("id", arrID).del();

    if (!proses) return res.status(400).json({ message: "Gagal Hapus" });

    res.json({ message: "Berhasil Hapus", type: "success" });
  });
