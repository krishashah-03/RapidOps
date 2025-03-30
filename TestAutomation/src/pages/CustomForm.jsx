import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const CustomForm = () => {
  const [url, setUrl] = useState("");
  const [prompt, setPrompt] = useState("");
  const [search, setSearch] = useState("");
  const [file, setFile] = useState(null);

  const handleFileUpload = (e) => setFile(e.target.files[0]);

  const handleSubmit = () => {
    console.log("URL:", url, "Prompt:", prompt, "Search:", search, "File:", file?.name || "No file");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      
      {/* Search Box at Top */}
      {/* <div className="w-full max-w-xl mb-6">
        <Input
          type="text"
          placeholder="🔍 Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border border-gray-300 shadow-md rounded-lg px-4 py-2 w-full"
        />
      </div> */}

      {/* Form Card */}
      <Card className="w-full max-w-lg bg-white shadow-xl rounded-lg p-6">
        <CardContent className="space-y-4">
          
          {/* URL Input in Center */}
          <Input
            type="url"
            placeholder="🌐 Enter URL here..."
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="border border-gray-300 rounded-lg px-4 py-2 w-full"
          />

          {/* File Upload */}
          <Input type="file" onChange={handleFileUpload} className="mt-2" />

        </CardContent>
      </Card>

      {/* Prompt Box at Bottom */}
      <div className="fixed bottom-4 w-full max-w-2xl px-4">
        <div className="relative flex items-center bg-white shadow-md rounded-full px-4 py-2">
          <Textarea
            placeholder="💬 Enter your search here..."
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            className="w-full border-none resize-none focus:ring-0"
          />
          <Button className="ml-2 bg-blue-500 text-white px-4 py-2 rounded-full" onClick={handleSubmit}>
            ➤
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CustomForm;
