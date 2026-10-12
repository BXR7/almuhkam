"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import bcrypt from "bcryptjs";
import prisma from "@/lib/prisma";
import { createSession, deleteSession, requirePermission } from "@/lib/auth";
import { allowed } from "@/lib/permissions";
import { consumeLimit } from "@/lib/rate-limit";
import { validInquiry, validForm, validId, validEdits } from "@/lib/validation";
import { sendInquiryNotificationEmail } from "@/lib/mail";

/* ─── 1. Authentication Actions ─── */

const dummyPasswordHash = bcrypt.hash("non-account timing equalizer", 12);

export async function loginAction(prevState, formData) {
  if (!validForm(formData)) return { error: "بيانات الدخول غير صحيحة." };
  const email = formData.get("email")?.toString().trim();
  const password = formData.get("password")?.toString();

  if (!email || email.length > 254 || !password || Buffer.byteLength(password) > 72) {
    return { error: "يرجى إدخال البريد الإلكتروني وكلمة المرور." };
  }

  try {
    if (!await consumeLimit("login", email.toLowerCase(), 10, 900)) return { error: "يرجى المحاولة لاحقاً." };
    const user = await prisma.user.findUnique({
      where: { email },
    });

    const isMatch = await bcrypt.compare(password, user?.password ?? await dummyPasswordHash);
    if (!user || !isMatch || !allowed(user.role, "content")) {
      return { error: "بيانات الدخول غير صحيحة." };
    }

    await createSession(user);
  } catch (error) {
    console.error("Login error:");
    return { error: "حدث خطأ أثناء محاولة تسجيل الدخول." };
  }

  redirect("/admin");
}

export async function logoutAction() {
  await deleteSession();
  redirect("/admin/login");
}

/* ─── 2. Blog Post Actions ─── */

export async function createPostAction(prevState, formData) {
  await requirePermission("content");

  if (!validForm(formData)) return { error: "بيانات غير صالحة." };
  const title = formData.get("title")?.toString().trim();
  let slug = formData.get("slug")?.toString().trim();
  const tag = formData.get("tag")?.toString().trim() || "كتابة أكاديمية";
  const readTime = formData.get("readTime")?.toString().trim() || "٥ دقائق";
  const excerpt = formData.get("excerpt")?.toString().trim();
  const content = formData.get("content")?.toString().trim();
  const isPublished = formData.get("isPublished") === "true";

  if (!title || !content || !excerpt) {
    return { error: "يرجى تعبئة العنوان والملخص والمحتوى بالكامل." };
  }

  if (!slug) {
    slug = title.toLowerCase().replace(/[\s/\\?#%&]+/g, "-");
  }

  try {
    const existing = await prisma.post.findUnique({ where: { slug } });
    if (existing) {
      slug = `${slug}-${Date.now().toString().slice(-4)}`;
    }

    await prisma.post.create({
      data: {
        title,
        slug,
        tag,
        readTime,
        excerpt,
        content,
        isPublished,
      },
    });

    revalidatePath("/blog");
    revalidatePath(`/blog/${slug}`);
    revalidatePath("/admin/blog");
  } catch (error) {
    console.error("Create post error:");
    return { error: "فشل في إضافة المقال، يرجى المحاولة لاحقاً." };
  }

  redirect("/admin/blog");
}

export async function updatePostAction(id, arg1, arg2) {
  await requirePermission("content");
  if (!validId(id)) return { error: "بيانات غير صالحة." };

  const formData = arg2 instanceof FormData ? arg2 : arg1 instanceof FormData ? arg1 : null;
  if (!formData) {
    return { error: "لم يتم استقبال بيانات النموذج بشكل صحيح." };
  }

  if (!validForm(formData)) return { error: "بيانات غير صالحة." };
  const title = formData.get("title")?.toString().trim();
  const slug = formData.get("slug")?.toString().trim();
  const tag = formData.get("tag")?.toString().trim();
  const readTime = formData.get("readTime")?.toString().trim();
  const excerpt = formData.get("excerpt")?.toString().trim();
  const content = formData.get("content")?.toString().trim();
  const isPublished = formData.get("isPublished") === "true";

  if (!title || !content || !excerpt) {
    return { error: "يرجى تعبئة العنوان والملخص والمحتوى بالكامل." };
  }

  try {
    await prisma.post.update({
      where: { id },
      data: {
        title,
        slug,
        tag,
        readTime,
        excerpt,
        content,
        isPublished,
      },
    });

    revalidatePath("/blog");
    revalidatePath(`/blog/${slug}`);
    revalidatePath("/admin/blog");
  } catch (error) {
    console.error("Update post error:");
    return { error: "فشل في تحديث المقال." };
  }

  redirect("/admin/blog");
}

export async function deletePostAction(id) {
  await requirePermission("content");
  if (!validId(id)) return { error: "بيانات غير صالحة." };

  try {
    await prisma.post.delete({ where: { id } });
    revalidatePath("/blog");
    revalidatePath("/admin/blog");
    return { success: true };
  } catch (error) {
    console.error("Delete post error:");
    return { error: "فشل حذف المقال." };
  }
}

/* ─── 3. Portfolio Project Actions ─── */

export async function createProjectAction(prevState, formData) {
  await requirePermission("content");

  if (!validForm(formData)) return { error: "بيانات غير صالحة." };
  const title = formData.get("title")?.toString().trim();
  const category = formData.get("category")?.toString().trim() || "أكاديمي";
  const beforeText = formData.get("beforeText")?.toString().trim();
  const afterText = formData.get("afterText")?.toString().trim();
  const editsJson = formData.get("editsJson")?.toString().trim() || "[]";

  if (!title || !beforeText || !afterText || !validEdits(editsJson)) {
    return { error: "يرجى تعبئة العنوان والنص قبل وبعد التدقيق." };
  }

  try {
    await prisma.project.create({
      data: {
        title,
        category,
        beforeText,
        afterText,
        editsJson,
      },
    });

    revalidatePath("/portfolio");
    revalidatePath("/admin/portfolio");
  } catch (error) {
    console.error("Create project error:");
    return { error: "فشل إضافة نموذج العمل." };
  }

  redirect("/admin/portfolio");
}

export async function updateProjectAction(id, arg1, arg2) {
  await requirePermission("content");
  if (!validId(id)) return { error: "بيانات غير صالحة." };

  const formData = arg2 instanceof FormData ? arg2 : arg1 instanceof FormData ? arg1 : null;
  if (!formData) {
    return { error: "لم يتم استقبال بيانات النموذج بشكل صحيح." };
  }

  if (!validForm(formData)) return { error: "بيانات غير صالحة." };
  const title = formData.get("title")?.toString().trim();
  const category = formData.get("category")?.toString().trim();
  const beforeText = formData.get("beforeText")?.toString().trim();
  const afterText = formData.get("afterText")?.toString().trim();
  const editsJson = formData.get("editsJson")?.toString().trim() || "[]";

  if (!title || !beforeText || !afterText || !validEdits(editsJson)) {
    return { error: "يرجى تعبئة العنوان والنص قبل وبعد التدقيق." };
  }

  try {
    await prisma.project.update({
      where: { id },
      data: {
        title,
        category,
        beforeText,
        afterText,
        editsJson,
      },
    });

    revalidatePath("/portfolio");
    revalidatePath("/admin/portfolio");
  } catch (error) {
    console.error("Update project error:");
    return { error: "فشل تحديث نموذج العمل." };
  }

  redirect("/admin/portfolio");
}

export async function deleteProjectAction(id) {
  await requirePermission("content");
  if (!validId(id)) return { error: "بيانات غير صالحة." };

  try {
    await prisma.project.delete({ where: { id } });
    revalidatePath("/portfolio");
    revalidatePath("/admin/portfolio");
    return { success: true };
  } catch (error) {
    console.error("Delete project error:");
    return { error: "فشل حذف النموذج." };
  }
}

/* ─── 4. Inquiry Actions ─── */

export async function submitContactInquiryAction(prevState, formData) {
  if (!validForm(formData)) return { error: "بيانات غير صالحة." };
  const name = formData.get("name")?.toString().trim();
  const email = formData.get("email")?.toString().trim();
  const phone = formData.get("phone")?.toString().trim() || null;
  const service = formData.get("service")?.toString().trim() || "تدقيق لغوي عام";
  const message = formData.get("message")?.toString().trim();

  if (!validInquiry({ name, email, phone, service, message })) {
    return { error: "يرجى تعبئة جميع الحقول المطلوبة (الاسم، البريد، الرسالة)." };
  }

  try {
    if (!await consumeLimit("contact", email.toLowerCase(), 5, 3600)) return { error: "يرجى المحاولة لاحقاً." };
    const inquiry = await prisma.inquiry.create({
      data: {
        name,
        email,
        phone,
        service,
        message,
        status: "NEW",
      },
    });

    // Send email notification in background
    sendInquiryNotificationEmail(inquiry).catch((err) => {
      console.error("Background email send error:");
    });

    revalidatePath("/admin/inquiries");
    revalidatePath("/admin");
    return { success: true, message: "تم استلام رسالتك بنجاح! سيتواصل معك خبيرنا اللغوي قريباً." };
  } catch (error) {
    console.error("Submit inquiry error:");
    return { error: "حدث خطأ أثناء إرسال طلبك. يرجى المحاولة مجدداً أو التواصل عبر واتساب مباشرة." };
  }
}

export async function updateInquiryStatusAction(id, newStatus) {
  await requirePermission("inquiries");

  if (!["NEW", "IN_REVIEW", "QUOTED", "COMPLETED", "ARCHIVED"].includes(newStatus) || !validId(id)) return { error: "بيانات غير صالحة." };
  try {
    await prisma.inquiry.update({
      where: { id },
      data: { status: newStatus },
    });
    revalidatePath("/admin/inquiries");
    revalidatePath("/admin");
    return { success: true };
  } catch (error) {
    console.error("Update inquiry error:");
    return { error: "فشل تحديث حالة الطلب." };
  }
}

export async function deleteInquiryAction(id) {
  await requirePermission("inquiries");
  if (!validId(id)) return { error: "بيانات غير صالحة." };

  try {
    await prisma.inquiry.delete({ where: { id } });
    revalidatePath("/admin/inquiries");
    revalidatePath("/admin");
    return { success: true };
  } catch (error) {
    console.error("Delete inquiry error:");
    return { error: "فشل حذف الطلب." };
  }
}

/* ─── 5. Settings Action ─── */

export async function updateSettingsAction(arg1, arg2) {
  await requirePermission("settings");

  const formData = arg2 instanceof FormData ? arg2 : arg1 instanceof FormData ? arg1 : null;
  if (!formData) {
    return { error: "لم يتم استقبال بيانات النموذج بشكل صحيح." };
  }

  if (!validForm(formData)) return { error: "بيانات غير صالحة." };
  try {
    const keys = ["site_name", "contact_email", "contact_phone", "whatsapp_number", "address"];
    for (const key of keys) {
      const val = formData.get(key)?.toString().trim();
      if (val !== undefined) {
        await prisma.setting.upsert({
          where: { key },
          update: { value: val },
          create: { key, value: val },
        });
      }
    }

    revalidatePath("/");
    revalidatePath("/contact");
    revalidatePath("/admin/settings");
    return { success: true, message: "تم حفظ وتحديث الإعدادات بنجاح!" };
  } catch (error) {
    console.error("Settings update error:");
    return { error: "فشل حفظ الإعدادات في قاعدة البيانات." };
  }
}
