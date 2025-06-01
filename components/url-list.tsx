/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CopyButton } from "@/components/ui/copy-button";
import { useToast } from "@/hooks/use-toast";
import {
  BarChart,
  Clock,
  ExternalLink,
  QrCode,
  Share2,
  Trash2,
  ArchiveIcon,
  ScanQrCodeIcon,
} from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { format } from "date-fns";
import { ShortenedURL } from "../interface/types";
import { useDataContext } from "../providers/ContextProvider";
import { deleteUrl, patchUrl } from "../api/services";
import { API_URL } from "@/lib/env";

export function UrlList() {
  const { userData, userDetails, getUserData, incrementClicks, deleteData } =
    useDataContext();
  const [urls, setUrls] = useState<ShortenedURL[]>([]);
  const [refreshFlag, setRefreshFlag] = useState(0);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [qrDialogOpen, setQrDialogOpen] = useState(false);
  const [selectedQrCode, setSelectedQrCode] = useState<string | null>(null);
  const [urlToDelete, setUrlToDelete] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [formattedDates, setFormattedDates] = useState<
    Record<string, { created: string; expires: string }>
  >({});
  const { toast } = useToast();

  useEffect(() => {
    getUser();
  }, [refreshFlag, userDetails]);

  useEffect(() => {
    setUrls(userData);

    const dates: Record<string, { created: string; expires: string }> = {};
    userData.forEach((url) => {
      dates[url.slug] = {
        created: format(new Date(url.createdAt), "PPp"),
        expires: url.expiresAt ? format(new Date(url.expiresAt), "PP") : "",
      };
    });
    setFormattedDates(dates);
  }, [userData]);

  async function getUser() {
    if (!userDetails.isLoaded) return;

    if (userDetails && userDetails.username) {
      await getUserData(userDetails.username);
    }
  }

  const handleOpenUrl = (url: ShortenedURL) => {
    patchUrl(url.slug, url.clicks + 1);
    incrementClicks(url.slug);
    setRefreshFlag((prev) => prev + 1);
    window.open(`${API_URL}/${url.slug}`, "_blank");
    toast({
      variant: "success",
      title: "Success",
      description: "Opening URL in new tab",
    });
  };

  const handleDeleteClick = (slug: string) => {
    setUrlToDelete(slug);
    setDeleteDialogOpen(true);
  };

  const handleQrCodeClick = (qrCode: string) => {
    setSelectedQrCode(qrCode);
    setQrDialogOpen(true);
  };

  const confirmDelete = () => {
    if (urlToDelete) {
      deleteUrl(urlToDelete)
        .then(() => {
          deleteData(urlToDelete);
          setRefreshFlag((prev) => prev + 1);
          setDeleteDialogOpen(false);
          setUrlToDelete(null);
          toast({
            variant: "success",
            title: "Success",
            description: "URL deleted successfully",
          });
        })
        .catch(() => {
          setError("Failed to delete URL. Please try again.");
          toast({
            variant: "destructive",
            title: "Error",
            description: "Failed to delete URL. Please try again.",
          });
        });
    }
  };

  const handleShare = async (url: string) => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "Shortened URL",
          text: "Check out this shortened URL",
          url,
        });
        toast({
          variant: "success",
          title: "Success",
          description: "URL shared successfully",
        });
      } catch (err) {
        console.log("Error sharing:", err);
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to share URL",
        });
      }
    } else {
      navigator.clipboard.writeText(url);
      toast({
        variant: "success",
        title: "Success",
        description: "URL copied to clipboard",
      });
    }
  };

  if (urls.length === 0) {
    return (
      <Card className="w-full max-w-3xl mx-auto mt-8 bg-card/95">
        <CardContent className="p-6 flex flex-col items-center justify-center text-center">
          <ArchiveIcon className="h-16 w-16 text-muted-foreground mb-4 opacity-50" />
          <h3 className="text-xl font-medium">No URLs yet</h3>
          <p className="text-muted-foreground mt-2">
            Your shortened URLs will appear here
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="w-full max-w-3xl mx-auto mt-8 space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold">Your links</h2>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setRefreshFlag((prev) => prev + 1)}
        >
          Refresh
        </Button>
      </div>

      {urls.map((url) => (
        <Card
          key={url.slug}
          className="overflow-hidden bg-card/95 border transition-all duration-200 hover:shadow-md"
        >
          <CardContent className="p-4">
            <div className="grid grid-cols-1 md:grid-cols-[1fr_auto] gap-4">
              <div>
                <div className="flex flex-col mb-2">
                  <div className="flex items-center text-primary font-medium mb-1 text-lg">
                    {url.slug}
                    <CopyButton value={url.slug} className="ml-2" />
                  </div>
                  <div className="text-sm text-muted-foreground mb-2 truncate">
                    <span
                      className="hover:underline cursor-pointer"
                      onClick={() => handleOpenUrl(url)}
                      title={url.slug}
                    >
                      {url.url.length > 70
                        ? url.url.slice(0, 70) + "..."
                        : url.url}
                    </span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 text-xs text-muted-foreground">
                  <div className="flex items-center">
                    <Clock className="h-3 w-3 mr-1" />
                    {formattedDates[url.slug]?.created || ""}
                  </div>
                  <div className="flex items-center">
                    <BarChart className="h-3 w-3 mr-1" />
                    {url.clicks} {url.clicks === 1 ? "click" : "clicks"}
                  </div>
                  {url.expiresAt && formattedDates[url.slug]?.expires && (
                    <div className="flex items-center">
                      <Clock className="h-3 w-3 mr-1" />
                      Expires: {formattedDates[url.slug].expires}
                    </div>
                  )}
                  {url.qrCode && (
                    <div className="flex items-center">
                      <QrCode className="h-3 w-3 mr-1" />
                      QR Code
                    </div>
                  )}
                </div>
              </div>

              <div className="flex items-center justify-end space-x-2">
                {url.hasQrCode && (
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => handleQrCodeClick(url.qrCode!)}
                  >
                    <ScanQrCodeIcon className="h-4 w-4" />
                    <span className="sr-only">Show QR Code</span>
                  </Button>
                )}
                <Button
                  variant="outline"
                  size="icon"
                  className="h-8 w-8"
                  onClick={() => handleShare(url.slug)}
                >
                  <Share2 className="h-4 w-4" />
                  <span className="sr-only">Share</span>
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  className="h-8 w-8"
                  onClick={() => handleOpenUrl(url)}
                >
                  <ExternalLink className="h-4 w-4" />
                  <span className="sr-only">Open</span>
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  className="h-8 w-8"
                  onClick={() => handleDeleteClick(url.slug)}
                >
                  <Trash2 className="h-4 w-4" />
                  <span className="sr-only">Delete</span>
                </Button>
              </div>
            </div>
          </CardContent>
          {error && <div className="p-4 text-red-500 text-sm">{error}</div>}
        </Card>
      ))}

      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete this shortened URL. This action
              cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete}>
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <Dialog open={qrDialogOpen} onOpenChange={setQrDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>QR Code</DialogTitle>
          </DialogHeader>
          <div className="flex justify-center p-6">
            {selectedQrCode && (
              <div className="relative w-64 h-64">
                <Image
                  src={selectedQrCode}
                  alt="QR Code"
                  fill
                  className="object-contain"
                />
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
