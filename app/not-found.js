import NotFound from "@/components/NotFound";

export default function Custom404() {
  return (
    <NotFound
      title="Page Not Found"
      message="The page you're looking for doesn't exist. It might have been moved, deleted, or you entered the wrong URL."
      showLoginButton={false}
    />
  );
}
