"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import bcrypt from "bcryptjs";
import prisma from "@/lib/prisma";
import { createSession, deleteSession, getSession } from "@/lib/auth";
import { sendInquiryNotificationEmail } from "@/lib/mail";

/* ─── 1. Authentication Actions ─── */

export async function loginAction(prevState, formData) {
  const email = formData.get("email")?.toString().trim();
  const password = formData.get("password")?.toString();

  if (!email || !password) {
    return { error: "يرجى إدخال البريد الإلكتروني وكلمة المرور." };
  }

  try {
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return { error: "بيانات الدخول غير صحيحة." };
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return { error: "بيانات الدخول غير صحيحة." };
    }

    await createSession(user);
  } catch (error) {
    console.error("Login error:", error);
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
  const session = await getSession();
  if (!session) redirect("/admin/login");

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
    console.error("Create post error:", error);
    return { error: "فشل في إضافة المقال، يرجى المحاولة لاحقاً." };
  }

  redirect("/admin/blog");
}

export async function updatePostAction(id, arg1, arg2) {
  const session = await getSession();
  if (!session) redirect("/admin/login");

  const formData = arg2 instanceof FormData ? arg2 : arg1 instanceof FormData ? arg1 : null;
  if (!formData) {
    return { error: "لم يتم استقبال بيانات النموذج بشكل صحيح." };
  }

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
    console.error("Update post error:", error);
    return { error: "فشل في تحديث المقال." };
  }

  redirect("/admin/blog");
}

export async function deletePostAction(id) {
  const session = await getSession();
  if (!session) redirect("/admin/login");

  try {
    await prisma.post.delete({ where: { id } });
    revalidatePath("/blog");
    revalidatePath("/admin/blog");
    return { success: true };
  } catch (error) {
    console.error("Delete post error:", error);
    return { error: "فشل حذف المقال." };
  }
}

/* ─── 3. Portfolio Project Actions ─── */

export async function createProjectAction(prevState, formData) {
  const session = await getSession();
  if (!session) redirect("/admin/login");

  const title = formData.get("title")?.toString().trim();
  const category = formData.get("category")?.toString().trim() || "أكاديمي";
  const beforeText = formData.get("beforeText")?.toString().trim();
  const afterText = formData.get("afterText")?.toString().trim();
  const editsJson = formData.get("editsJson")?.toString().trim() || "[]";

  if (!title || !beforeText || !afterText) {
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
    console.error("Create project error:", error);
    return { error: "فشل إضافة نموذج العمل." };
  }

  redirect("/admin/portfolio");
}

export async function updateProjectAction(id, arg1, arg2) {
  const session = await getSession();
  if (!session) redirect("/admin/login");

  const formData = arg2 instanceof FormData ? arg2 : arg1 instanceof FormData ? arg1 : null;
  if (!formData) {
    return { error: "لم يتم استقبال بيانات النموذج بشكل صحيح." };
  }

  const title = formData.get("title")?.toString().trim();
  const category = formData.get("category")?.toString().trim();
  const beforeText = formData.get("beforeText")?.toString().trim();
  const afterText = formData.get("afterText")?.toString().trim();
  const editsJson = formData.get("editsJson")?.toString().trim() || "[]";

  if (!title || !beforeText || !afterText) {
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
    console.error("Update project error:", error);
    return { error: "فشل تحديث نموذج العمل." };
  }

  redirect("/admin/portfolio");
}

export async function deleteProjectAction(id) {
  const session = await getSession();
  if (!session) redirect("/admin/login");

  try {
    await prisma.project.delete({ where: { id } });
    revalidatePath("/portfolio");
    revalidatePath("/admin/portfolio");
    return { success: true };
  } catch (error) {
    console.error("Delete project error:", error);
    return { error: "فشل حذف النموذج." };
  }
}

/* ─── 4. Inquiry Actions ─── */

export async function submitContactInquiryAction(prevState, formData) {
  const name = formData.get("name")?.toString().trim();
  const email = formData.get("email")?.toString().trim();
  const phone = formData.get("phone")?.toString().trim() || null;
  const service = formData.get("service")?.toString().trim() || "تدقيق لغوي عام";
  const message = formData.get("message")?.toString().trim();

  if (!name || !email || !message) {
    return { error: "يرجى تعبئة جميع الحقول المطلوبة (الاسم، البريد، الرسالة)." };
  }

  try {
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
      console.error("Background email send error:", err);
    });

    revalidatePath("/admin/inquiries");
    revalidatePath("/admin");
    return { success: true, message: "تم استلام رسالتك بنجاح! سيتواصل معك خبيرنا اللغوي قريباً." };
  } catch (error) {
    console.error("Submit inquiry error:", error);
    return { error: "حدث خطأ أثناء إرسال طلبك. يرجى المحاولة مجدداً أو التواصل عبر واتساب مباشرة." };
  }
}

export async function updateInquiryStatusAction(id, newStatus) {
  const session = await getSession();
  if (!session) redirect("/admin/login");

  try {
    await prisma.inquiry.update({
      where: { id },
      data: { status: newStatus },
    });
    revalidatePath("/admin/inquiries");
    revalidatePath("/admin");
    return { success: true };
  } catch (error) {
    console.error("Update inquiry error:", error);
    return { error: "فشل تحديث حالة الطلب." };
  }
}

export async function deleteInquiryAction(id) {
  const session = await getSession();
  if (!session) redirect("/admin/login");

  try {
    await prisma.inquiry.delete({ where: { id } });
    revalidatePath("/admin/inquiries");
    revalidatePath("/admin");
    return { success: true };
  } catch (error) {
    console.error("Delete inquiry error:", error);
    return { error: "فشل حذف الطلب." };
  }
}

/* ─── 5. Settings Action ─── */

export async function updateSettingsAction(arg1, arg2) {
  const session = await getSession();
  if (!session) redirect("/admin/login");

  const formData = arg2 instanceof FormData ? arg2 : arg1 instanceof FormData ? arg1 : null;
  if (!formData) {
    return { error: "لم يتم استقبال بيانات النموذج بشكل صحيح." };
  }

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
    console.error("Settings update error:", error);
    return { error: "فشل حفظ الإعدادات في قاعدة البيانات." };
  }
}
