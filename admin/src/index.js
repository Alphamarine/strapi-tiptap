import { prefixPluginTranslations } from "@strapi/helper-plugin";
import pluginPkg from "../../package.json";
import pluginId from "./pluginId";
import Initializer from "./components/Initializer";

const name = pluginPkg.strapi.name;

export default {
  register(app) {
    app.registerPlugin({
      id: pluginId,
      initializer: Initializer,
      isReady: false,
      name,
    });
    app.customFields.register({
      name: "tiptap",
      type: "richtext",
      intlLabel: {
        id: `${pluginId}.tiptap.label`,
        defaultMessage: "Tiptap",
      },
      intlDescription: {
        id: `${pluginId}.tiptap.description`,
        defaultMessage: "Custom rich text editor",
      },
      components: {
        Input: async () =>
          import(
            /* webpackChunkName: "tiptap-input-component" */ "./components/Input"
          ),
      },
      options: {
        // declare options here
      },
    });
  },

  bootstrap(app) {},
  async registerTrads({ locales }) {
    const importedTrads = await Promise.all(
      locales.map((locale) => {
        return import(
          /* webpackChunkName: "translation-[request]" */ `./translations/${locale}.json`
        )
          .then(({ default: data }) => {
            return {
              data: prefixPluginTranslations(data, pluginId),
              locale,
            };
          })
          .catch(() => {
            return {
              data: {},
              locale,
            };
          });
      })
    );

    return Promise.resolve(importedTrads);
  },
};
