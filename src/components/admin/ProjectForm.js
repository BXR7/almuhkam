"use client";

import { useState } from "react";
import Link from "next/link";
import { Plus, Trash2, Save, ArrowRight } from "lucide-react";
import styles from "@/styles/admin.module.css";

export default function ProjectForm({ initialData = null, action }) {
  const [edits, setEdits] = useState(() => {
    if (initialData?.editsJson) {
      try {
        return JSON.parse(initialData.editsJson);
      } catch (e) {
        return [];
      }
    }
    return [{ from: "", to: "", type: "" }];
  });

  const addEditRow = () => {
    setEdits([...edits, { from: "", to: "", type: "" }]);
  };

  const removeEditRow = (index) => {
    setEdits(edits.filter((_, i) => i !== index));
  };

  const updateEditRow = (index, field, value) => {
    const next = [...edits];
    next[index][field] = value;
    setEdits(next);
  };

  return (
    <form action={action} className={styles.card}>
      <div className={styles.formGrid}>
        <div className={styles.formGroup} style={{ gridColumn: "1 / -1" }}>
          <label className={styles.label} htmlFor="title">عنوان النموذج / التخصص *</label>
          <input
            id="title"
            name="title"
            type="text"
            required
            defaultValue={initialData?.title || ""}
            placeholder="مثال: التدقيق الأكاديمي (رسالة ماجستير في التربية)"
            className={styles.input}
          />
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label} htmlFor="category">المجال / التصنيف *</label>
          <select id="category" name="category" className={styles.select} defaultValue={initialData?.category || "رسائل ماجستير"}>
            <option value="رسائل ماجستير">رسائل ماجستير</option>
            <option value="أطروحات دكتوراه">أطروحات دكتوراه</option>
            <option value="تحرير كتب">تحرير كتب وروايات</option>
            <option value="كتابة مؤسسية">كتابة مؤسسية وتقارير</option>
            <option value="محتوى تسويقي">محتوى تسويقي وسيو</option>
          </select>
        </div>

        <div className={styles.formGroup} style={{ gridColumn: "1 / -1" }}>
          <label className={styles.label} htmlFor="beforeText" style={{ color: "#c0392b" }}>
            النص قبل التدقيق (يحتوي على الأخطاء الأصلية) *
          </label>
          <textarea
            id="beforeText"
            name="beforeText"
            required
            rows={4}
            defaultValue={initialData?.beforeText || ""}
            placeholder="أدخل النص الأصلي قبل إجراء التصحيحات اللغوية..."
            className={styles.textarea}
            style={{ borderColor: "rgba(192, 57, 43, 0.3)", background: "rgba(254, 242, 242, 0.5)" }}
          />
        </div>

        <div className={styles.formGroup} style={{ gridColumn: "1 / -1" }}>
          <label className={styles.label} htmlFor="afterText" style={{ color: "#0d5c46" }}>
            النص بعد التدقيق (النسخة المنقحة والمحكمة) *
          </label>
          <textarea
            id="afterText"
            name="afterText"
            required
            rows={4}
            defaultValue={initialData?.afterText || ""}
            placeholder="أدخل النص النهائي بعد الصياغة والتصحيح..."
            className={styles.textarea}
            style={{ borderColor: "rgba(13, 92, 70, 0.3)", background: "rgba(240, 253, 244, 0.5)" }}
          />
        </div>

        {/* Dynamic Annotations / Edits List */}
        <div className={styles.formGroup} style={{ gridColumn: "1 / -1", marginTop: "12px" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "12px" }}>
            <label className={styles.label}>شروحات وتفاصيل الأخطاء المصححة (تظهر أسفل المقارن):</label>
            <button
              type="button"
              onClick={addEditRow}
              className={styles.secondaryBtn}
              style={{ padding: "4px 10px", fontSize: "0.8rem" }}
            >
              <Plus size={14} />
              <span>إضافة تصحيح آخر</span>
            </button>
          </div>

          <input type="hidden" name="editsJson" value={JSON.stringify(edits)} />

          <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            {edits.map((edit, idx) => (
              <div
                key={idx}
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr 2fr auto",
                  gap: "10px",
                  background: "#f7f6f2",
                  padding: "12px",
                  borderRadius: "8px",
                  alignItems: "center",
                }}
              >
                <div>
                  <span style={{ fontSize: "0.75rem", color: "#5a6b63", display: "block", marginBottom: "3px" }}>الكلمة السابقة:</span>
                  <input
                    type="text"
                    value={edit.from}
                    onChange={(e) => updateEditRow(idx, "from", e.target.value)}
                    placeholder="مثال: الى"
                    className={styles.input}
                    style={{ padding: "6px 10px", fontSize: "0.85rem" }}
                  />
                </div>

                <div>
                  <span style={{ fontSize: "0.75rem", color: "#5a6b63", display: "block", marginBottom: "3px" }}>تم تصحيحها إلى:</span>
                  <input
                    type="text"
                    value={edit.to}
                    onChange={(e) => updateEditRow(idx, "to", e.target.value)}
                    placeholder="مثال: إلى"
                    className={styles.input}
                    style={{ padding: "6px 10px", fontSize: "0.85rem" }}
                  />
                </div>

                <div>
                  <span style={{ fontSize: "0.75rem", color: "#5a6b63", display: "block", marginBottom: "3px" }}>نوع الخطأ والتعليل:</span>
                  <input
                    type="text"
                    value={edit.type}
                    onChange={(e) => updateEditRow(idx, "type", e.target.value)}
                    placeholder="مثال: إملاء: إضافة همزة القطع لحرف الجر"
                    className={styles.input}
                    style={{ padding: "6px 10px", fontSize: "0.85rem" }}
                  />
                </div>

                <div style={{ paddingTop: "18px" }}>
                  <button
                    type="button"
                    onClick={() => removeEditRow(idx)}
                    className={styles.dangerBtn}
                    style={{ padding: "6px 8px" }}
                    title="حذف هذا السطر"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className={styles.formActions}>
        <Link href="/admin/portfolio" className={styles.secondaryBtn}>
          إلغاء
        </Link>
        <button type="submit" className={styles.primaryBtn}>
          <Save size={16} />
          <span>{initialData ? "حفظ التعديلات" : "إضافة النموذج"}</span>
        </button>
      </div>
    </form>
  );
}
