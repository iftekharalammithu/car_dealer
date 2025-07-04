"use client";
import { type IAllProps } from "@tinymce/tinymce-react";
import {
  Editor,
  InitOptions,
} from "@tinymce/tinymce-react/lib/cjs/main/ts/components/Editor";
import { useFormContext } from "react-hook-form";
import { FormLabel } from "../ui/form";

interface TextEditorProps {
  name: string;
  label?: string;
  config?: IAllProps;
}

export const Rich_Text_Editor = (props: TextEditorProps) => {
  const { name, label, config } = props;

  const init: InitOptions = {
    height: 200,
    skin: "oxide-darkf",
    content_css: "dark",
    icons: "small",
    menubar: false,
    resize: false,
    branding: false,
    convert_urls: true,
    wordcount: true,
    elementpath: true,
    importcss_append: true,
    browser_spellcheck: true,
    highlight_on_focuse: true,
    ewline_behavior: "linebreak", // Changed from 'linebreak'
    forced_root_block: "p", // Added to ensure consistent block behavior
    newline_behavior: "linebreak",
    plugins: ["lists", "link", "wordcount", "importcss", "media"],
    valid_element: "P,a[href|rel|target], strong/b,em/i,u,strike,br,ul,ol,li,",
    toolbar:
      "undo redo | styles | bold italic underline strikethrough formatselect | bullist numlist | link",
    // Configure link settings
    link_default_target: "_blank",
    link_assume_external_targets: true,
    autolink_pattern: /^(https?:\/\/|www\.)(.+)$/i,
    // Configure paste behavior
    paste_postprocess: (plugin, args) => {
      const links = args.node.getElementsByTagName("a");
      for (let i = 0; i < links.length; i++) {
        links[i].style.color = "#3b82f6";
        links[i].style.textDecoration = "underline";
      }
    },
    // Add custom styles for
    linkscontent_style: ` a {
              color: #3b82f6;
              text-decoration: underline;
              cursor: pointer;
          }
          a:hover {
              color: #2563eb;
          }
      `,
    ...(config?.init && { ...config.init }),
  };

  const form = useFormContext();
  const value = form.watch(name);

  const handleEditChange = (content: string) => {
    form.setValue(name, content);
  };

  return (
    <div className=" space-y-2">
      <FormLabel htmlFor={name}>{label}</FormLabel>
      <Editor
        {...config}
        init={init}
        value={value}
        apiKey={process.env.TinyMCE_API_KEY}
        onEditorChange={handleEditChange}
      ></Editor>
    </div>
  );
};
