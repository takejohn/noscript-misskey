export interface MfmContext {
    plain: boolean;
    nowrap?: boolean;
    nyaize: boolean;
    authorHost?: string;
    emojiUrls?: Record<string, string>;
    localHost: string;
}
